interface Subscriber {
  (): void;
  scopes?: Scope[];
}

interface Scope {
  parent?: Scope;
  children?: Scope[];
  /** subscribers */
  subs?: (() => void)[];
}

let currentScope: Scope | null = null;

export function makeScope(block: () => void) {
  initScope();
  block();
  closeScope();
}

export function getCurrentScope() {
  return currentScope;
}

function notify(scope: Scope) {
  if (!scope.subs?.length) return;
  scope.subs.forEach((sub) => sub());
}

function subscribe(scope: Scope, subscriber: Subscriber) {
  (subscriber.scopes || (subscriber.scopes = [])).push(scope);
  (scope.subs || (scope.subs = [])).push(subscriber);
}

function initScope() {
  const parent = currentScope;
  currentScope = Object.create(null) as Scope;
  if (parent) {
    (parent.children || (parent.children = [])).push(currentScope);
    currentScope.parent = parent;
  }
}

function closeScope() {
  currentScope = currentScope?.parent || null;
}
