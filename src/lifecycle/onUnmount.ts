import { addUnmountedHandler } from './makeBlock';

export const onUnmount = (handler: () => void) => {
  addUnmountedHandler(handler);
};
