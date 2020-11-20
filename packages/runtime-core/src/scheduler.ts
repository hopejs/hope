import { isArray } from '@hopejs/shared';

export interface SchedulerJob {
  (): void;
  id?: number;
  allowRecurse?: boolean;
}

export type SchedulerCb = Function & { id?: number };
export type SchedulerCbs = SchedulerCb | SchedulerCb[];

let isFlushing = false;
let isFlushPending = false;

const queue: SchedulerJob[] = [];
let flushIndex = 0;

const pendingPostFlushCbs: SchedulerCb[] = [];
let activePostFlushCbs: SchedulerCb[] | null = null;
let postFlushIndex = 0;

const resolvedPromise: Promise<any> = Promise.resolve();
let currentFlushPromise: Promise<void> | null = null;

const RECURSION_LIMIT = 100;
type CountMap = Map<SchedulerJob | SchedulerCb, number>;

export function nextTick(fn?: () => void): Promise<void> {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(fn) : p;
}

export function queueJob(job: SchedulerJob) {
  // the dedupe search uses the startIndex argument of Array.includes()
  // by default the search index includes the current job that is being run
  // so it cannot recursively trigger itself again.
  // if the job is a watch() callback, the search will start with a +1 index to
  // allow it recursively trigger itself - it is the user's responsibility to
  // ensure it doesn't end up in an infinite loop.
  if (
    !queue.length ||
    !queue.includes(
      job,
      isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
    )
  ) {
    queue.push(job);
    queueFlush();
  }
}

function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}

export function invalidateJob(job: SchedulerJob) {
  const i = queue.indexOf(job);
  if (i > -1) {
    queue.splice(i, 1);
  }
}

function queueCb(
  cb: SchedulerCbs,
  activeQueue: SchedulerCb[] | null,
  pendingQueue: SchedulerCb[],
  index: number
) {
  if (!isArray(cb)) {
    if (
      !activeQueue ||
      !activeQueue.includes(
        cb,
        (cb as SchedulerJob).allowRecurse ? index + 1 : index
      )
    ) {
      pendingQueue.push(cb);
    }
  } else {
    // if cb is an array, it is a component lifecycle hook which can only be
    // triggered by a job, which is already deduped in the main queue, so
    // we can skip duplicate check here to improve perf
    pendingQueue.push(...cb);
  }
  queueFlush();
}

export function queuePostFlushCb(cb: SchedulerCbs) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}

export function flushPostFlushCbs(seen?: CountMap) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;

    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }

    activePostFlushCbs = deduped;
    if (__DEV__) {
      seen = seen || new Map();
    }

    for (
      postFlushIndex = 0;
      postFlushIndex < activePostFlushCbs.length;
      postFlushIndex++
    ) {
      if (__DEV__) {
        checkRecursiveUpdates(seen!, activePostFlushCbs[postFlushIndex]);
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}

const getId = (job: SchedulerJob | SchedulerCb) =>
  job.id == null ? Infinity : job.id;

function flushJobs(seen?: CountMap) {
  isFlushPending = false;
  isFlushing = true;
  if (__DEV__) {
    seen = seen || new Map();
  }

  queue.sort((a, b) => getId(a) - getId(b));

  for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
    const job = queue[flushIndex];
    if (job) {
      if (__DEV__) {
        checkRecursiveUpdates(seen!, job);
      }
      job();
    }
  }

  flushIndex = 0;
  queue.length = 0;

  flushPostFlushCbs(seen);

  isFlushing = false;
  currentFlushPromise = null;
  // some postFlushCb queued jobs!
  // keep flushing until it drains.
  if (queue.length || pendingPostFlushCbs.length) {
    flushJobs(seen);
  }
}

function checkRecursiveUpdates(seen: CountMap, fn: SchedulerJob | SchedulerCb) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn)!;
    if (count > RECURSION_LIMIT) {
      throw new Error(
        `Maximum recursive updates exceeded. ` +
          `This means you have a reactive effect that is mutating its own ` +
          `dependencies and thus recursively triggering itself. Possible sources ` +
          `include component template, render function, updated hook or ` +
          `watcher source function.`
      );
    } else {
      seen.set(fn, count + 1);
    }
  }
}
