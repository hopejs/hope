import { reactive } from '@hopejs/reactivity';

let componentProps: Record<string, any> | null;

export function setComponentProps() {
  componentProps = reactive({});
}

export function resetComponentProps() {
  componentProps = null;
}

export function getComponentProps() {
  return componentProps;
}
