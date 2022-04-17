export const htmlNS = 'http://www.w3.org/1999/xhtml';
export const svgNS = 'http://www.w3.org/2000/svg';

export const isOn = (key: string) => /^on[^a-z]/.test(key);
export const objectToString = Object.prototype.toString;
export const toTypeString = (value: unknown): string =>
  objectToString.call(value);
export const isArray = Array.isArray;
export const isMap = (val: unknown): val is Map<any, any> =>
  toTypeString(val) === '[object Map]';
export const isSet = (val: unknown): val is Set<any> =>
  toTypeString(val) === '[object Set]';
export const isDate = (val: unknown): val is Date => val instanceof Date;
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function';
export const isString = (val: unknown): val is string =>
  typeof val === 'string';
export const isNumber = (val: unknown): val is number =>
  typeof val === 'number';
export const isSymbol = (val: unknown): val is symbol =>
  typeof val === 'symbol';
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object';
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

export const parseEventName = (eventName: string) => {
  return eventName.slice(2).toLocaleLowerCase();
};
export const forEachObj = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  cb: (value: T[K], key: K) => void
) => {
  (Object.keys(obj) as K[]).forEach((key) => cb(obj[key], key));
};

/**
 * breadth-first search
 */
export const bfs = <T extends Record<string, any> & { c?: any[] | null }>(
  root: T,
  handler: (node: T) => void
) => {
  const queue = [root];
  let index = 0;
  do {
    const node = queue[index++];
    handler(node);
    if (node.c) {
      queue.push(...node.c);
    }
  } while (queue[index]);
};
