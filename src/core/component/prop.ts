let componentProps: Record<string, any> | null;

export function setComponentProps() {
  componentProps = {};
}

export function resetComponentProps() {
  componentProps = null;
}

export function getComponentProps() {
  return componentProps;
}
