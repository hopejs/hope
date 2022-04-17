import { addMountedHander } from '@/html/makeRenderTree';

export const onMount = (handler: () => void) => {
  addMountedHander(handler);
};
