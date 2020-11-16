import { StaticAttr, start, end } from "@hopejs/runtime-core";

export function div(attr?: StaticAttr) {
  start("div", attr);
}

export function $div() {
  end();
}

export function span(attr?: StaticAttr) {
  start("span", attr);
}

export function $span() {
  end();
}
