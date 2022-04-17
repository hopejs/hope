import { onUnmount } from '@/lifecycle/onUnmount';

interface Subscriber {
  (): void;
  scopes?: ScopeTree[];
}

export interface ScopeTree {
  /** parent */
  p?: ScopeTree;
  /** children */
  c?: ScopeTree[];
  /** subscribers */
  subs?: (() => void)[];
}

export interface ScopeProp {
  (): any;
  s?: ScopeTree | null;
}

let currentScope: ScopeTree | null = null;

export function makeScopeTree(block: () => void) {
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

export const setCurrentScope = (scope: ScopeTree | null) => {
  currentScope = scope;
};

export function notify(scope: ScopeTree | null) {
  if (!scope?.subs?.length) return;
  scope.subs.forEach((sub) => sub());
}

export function subscribe(scope: ScopeTree | null, subscriber: Subscriber) {
  if (!scope) return;
  // (subscriber.scopes || (subscriber.scopes = [])).push(scope);
  (scope.subs || (scope.subs = [])).push(subscriber);
}

function initScope() {
  const parent = currentScope;
  currentScope = Object.create(null) as ScopeTree;
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
