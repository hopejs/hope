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
  return prop ? prop.s || (prop.s = currentScope) : currentScope;
}

export const setCurrentScope = (scope: ScopeTree | null) => {
  currentScope = scope;
};

export function notify(scope: ScopeTree | null) {
  scope && scope.subs && scope.subs.forEach((sub) => sub());
}

export function subscribe(scope: ScopeTree | null, subscriber: Subscriber) {
  scope && (scope.subs || (scope.subs = [])).push(subscriber);
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
  currentScope = (currentScope && currentScope.p) || null;
}
