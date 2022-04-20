export interface Fragment {
  key: string;
  /** Elements */
  els: Element[];
}

let currentFragment: Fragment | null = null;

export const makeFragment = (
  handler: (key: (value: string | number) => void) => void
) => {
  initFragment();
  handler((key) => {
    currentFragment!.key = String(key);
  });
  closeFragment();
};

export const getCurrentFragment = () => currentFragment;

const initFragment = () => {
  currentFragment = Object.create(null) as Fragment;
  currentFragment!.els = [];
};

const closeFragment = () => {
  currentFragment = null;
};
