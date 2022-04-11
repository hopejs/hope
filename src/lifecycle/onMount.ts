import { addMountedHander } from '@/html/makeRender';

export const onMount = (handler: () => void) => {
  addMountedHander(handler);
};
