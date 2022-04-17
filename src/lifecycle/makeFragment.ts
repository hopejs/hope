export interface Fragment {
  key: string;
  /** Elements */
  els: Element[];
}

let fragment: Fragment | null = null;

export const makeFragment = (key: string, handler: (key: string) => void) => {
  initFragment(key);
  handler(key);
  clearFragment();
};

export const getCurrentFragment = () => fragment;

const initFragment = (key: string) => {
  fragment = Object.create(null);
  fragment!.key = key;
  fragment!.els = [];
};

const clearFragment = () => {
  fragment = null;
};
