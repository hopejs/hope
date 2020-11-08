import {
  StaticAttr,
  start,
  end,
  content as coreContent,
  ContentCallback,
} from "@hopejs/runtime-core";

export function content(cb: ContentCallback) {
  coreContent(cb);
}

export function div(attr: StaticAttr) {
  start("div", attr);
}

export function $div() {
  end();
}

export function span(attr: StaticAttr) {
  start("span", attr);
}

export function $span() {
  end();
}
