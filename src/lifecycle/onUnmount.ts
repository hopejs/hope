import { addUnmountedHandler } from './makeBlockTree';

export const onUnmount = (handler: () => void) => {
  addUnmountedHandler(handler);
};
