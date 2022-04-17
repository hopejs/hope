import { onUnmount } from '@/lifecycle/onUnmount';

interface Subscriber {
  (): void;
  scopes?: Scope[];
}

export interface Scope {
  /** parent */
  p?: Scope;
  /** children */
  c?: Scope[];
  /** subscribers */
  subs?: (() => void)[];
}

export interface ScopeProp {
  (): any;
  s?: Scope | null;
}

let currentScope: Scope | null = null;

export function makeScope(block: () => void) {
  initScope();
  block();
  closeScope();
}

export function getCurrentScope(prop?: ScopeProp) {
  if (prop) {
    return prop.s || (prop.s = currentScope);
  }
  return currentScope;
}

export const setCurrentScope = (scope: Scope | null) => {
  currentScope = scope;
};

export function notify(scope: Scope | null) {
  if (!scope?.subs?.length) return;
  scope.subs.forEach((sub) => sub());
}

export function subscribe(scope: Scope | null, subscriber: Subscriber) {
  if (!scope) return;
  // (subscriber.scopes || (subscriber.scopes = [])).push(scope);
  (scope.subs || (scope.subs = [])).push(subscriber);
}

function initScope() {
  const parent = currentScope;
  currentScope = Object.create(null) as Scope;
  if (parent) {
    (parent.c || (parent.c = [])).push(currentScope);
    currentScope.p = parent;
    onUnmount(() => {
      parent.c = parent.c?.filter((item) => item !== currentScope);
    });
  }
}

function closeScope() {
  currentScope = currentScope?.p || null;
}
