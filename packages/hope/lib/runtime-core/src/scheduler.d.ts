export interface SchedulerJob {
    (): void;
    id?: number;
    allowRecurse?: boolean;
}
export declare type SchedulerCb = Function & {
    id?: number;
};
export declare type SchedulerCbs = SchedulerCb | SchedulerCb[];
declare type CountMap = Map<SchedulerJob | SchedulerCb, number>;
export declare function nextTick(fn?: () => void): Promise<void>;
export declare function queueJob(job: SchedulerJob): void;
export declare function invalidateJob(job: SchedulerJob): void;
export declare function queuePostFlushCb(cb: SchedulerCbs): void;
export declare function flushPostFlushCbs(seen?: CountMap): void;
export {};
