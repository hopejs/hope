import { createComment } from "./createComment";

export function createPlaceholder(value: string) {
  // TODO: 生产模式用空白字符节点代替
  return createComment(value);
}