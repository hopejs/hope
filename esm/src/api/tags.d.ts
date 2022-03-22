import { Attrs } from './props-and-attrs/attrs';
import { Props } from './props-and-attrs/props';
declare type TagName = keyof (HTMLElementTagNameMap & SVGElementTagNameMap);
declare type AttrsOrProps<K extends keyof (HTMLElementTagNameMap & SVGElementTagNameMap)> = Attrs | Props<(HTMLElementTagNameMap & SVGElementTagNameMap)[K]>;
export declare const a: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLAnchorElement & SVGAElement> | undefined) => void, $a: () => void;
export declare const script: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLScriptElement & SVGScriptElement> | undefined) => void, $script: () => void;
export declare const style: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLStyleElement & SVGStyleElement> | undefined) => void, $style: () => void;
export declare const title: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLTitleElement & SVGTitleElement> | undefined) => void, $title: () => void;
export declare const address: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $address: () => void;
export declare const area: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLAreaElement> | undefined) => void, $area: () => void;
export declare const article: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $article: () => void;
export declare const aside: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $aside: () => void;
export declare const audio: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLAudioElement> | undefined) => void, $audio: () => void;
export declare const b: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $b: () => void;
export declare const base: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLBaseElement> | undefined) => void, $base: () => void;
export declare const bdi: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $bdi: () => void;
export declare const bdo: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $bdo: () => void;
export declare const blockquote: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLQuoteElement> | undefined) => void, $blockquote: () => void;
export declare const body: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLBodyElement> | undefined) => void, $body: () => void;
export declare const br: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLBRElement> | undefined) => void, $br: () => void;
export declare const button: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLButtonElement> | undefined) => void, $button: () => void;
export declare const canvas: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLCanvasElement> | undefined) => void, $canvas: () => void;
export declare const caption: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLTableCaptionElement> | undefined) => void, $caption: () => void;
export declare const cite: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $cite: () => void;
export declare const code: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $code: () => void;
export declare const col: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLTableColElement> | undefined) => void, $col: () => void;
export declare const colgroup: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLTableColElement> | undefined) => void, $colgroup: () => void;
export declare const data: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLDataElement> | undefined) => void, $data: () => void;
export declare const datalist: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLDataListElement> | undefined) => void, $datalist: () => void;
export declare const dd: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $dd: () => void;
export declare const del: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLModElement> | undefined) => void, $del: () => void;
export declare const details: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLDetailsElement> | undefined) => void, $details: () => void;
export declare const dfn: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $dfn: () => void;
export declare const dialog: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLDialogElement> | undefined) => void, $dialog: () => void;
export declare const dir: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLDirectoryElement> | undefined) => void, $dir: () => void;
export declare const dl: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLDListElement> | undefined) => void, $dl: () => void;
export declare const dt: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $dt: () => void;
export declare const em: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $em: () => void;
export declare const embed: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLEmbedElement> | undefined) => void, $embed: () => void;
export declare const fieldset: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLFieldSetElement> | undefined) => void, $fieldset: () => void;
export declare const figcaption: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $figcaption: () => void;
export declare const figure: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $figure: () => void;
export declare const font: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLFontElement> | undefined) => void, $font: () => void;
export declare const footer: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $footer: () => void;
export declare const form: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLFormElement> | undefined) => void, $form: () => void;
export declare const frame: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLFrameElement> | undefined) => void, $frame: () => void;
export declare const frameset: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLFrameSetElement> | undefined) => void, $frameset: () => void;
export declare const h1: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLHeadingElement> | undefined) => void, $h1: () => void;
export declare const h2: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLHeadingElement> | undefined) => void, $h2: () => void;
export declare const h3: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLHeadingElement> | undefined) => void, $h3: () => void;
export declare const h4: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLHeadingElement> | undefined) => void, $h4: () => void;
export declare const h5: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLHeadingElement> | undefined) => void, $h5: () => void;
export declare const h6: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLHeadingElement> | undefined) => void, $h6: () => void;
export declare const head: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLHeadElement> | undefined) => void, $head: () => void;
export declare const header: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $header: () => void;
export declare const hgroup: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $hgroup: () => void;
export declare const hr: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLHRElement> | undefined) => void, $hr: () => void;
export declare const html: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLHtmlElement> | undefined) => void, $html: () => void;
export declare const i: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $i: () => void;
export declare const iframe: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLIFrameElement> | undefined) => void, $iframe: () => void;
export declare const img: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLImageElement> | undefined) => void, $img: () => void;
export declare const input: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLInputElement> | undefined) => void, $input: () => void;
export declare const ins: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLModElement> | undefined) => void, $ins: () => void;
export declare const kbd: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $kbd: () => void;
export declare const label: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLLabelElement> | undefined) => void, $label: () => void;
export declare const legend: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLLegendElement> | undefined) => void, $legend: () => void;
export declare const li: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLLIElement> | undefined) => void, $li: () => void;
export declare const link: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLLinkElement> | undefined) => void, $link: () => void;
export declare const main: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $main: () => void;
export declare const map: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLMapElement> | undefined) => void, $map: () => void;
export declare const mark: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $mark: () => void;
export declare const marquee: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLMarqueeElement> | undefined) => void, $marquee: () => void;
export declare const menu: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLMenuElement> | undefined) => void, $menu: () => void;
export declare const meta: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLMetaElement> | undefined) => void, $meta: () => void;
export declare const meter: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLMeterElement> | undefined) => void, $meter: () => void;
export declare const nav: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $nav: () => void;
export declare const noscript: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $noscript: () => void;
export declare const object: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLObjectElement> | undefined) => void, $object: () => void;
export declare const ol: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLOListElement> | undefined) => void, $ol: () => void;
export declare const optgroup: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLOptGroupElement> | undefined) => void, $optgroup: () => void;
export declare const option: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLOptionElement> | undefined) => void, $option: () => void;
export declare const output: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLOutputElement> | undefined) => void, $output: () => void;
export declare const p: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLParagraphElement> | undefined) => void, $p: () => void;
export declare const param: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLParamElement> | undefined) => void, $param: () => void;
export declare const picture: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLPictureElement> | undefined) => void, $picture: () => void;
export declare const pre: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLPreElement> | undefined) => void, $pre: () => void;
export declare const progress: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLProgressElement> | undefined) => void, $progress: () => void;
export declare const q: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLQuoteElement> | undefined) => void, $q: () => void;
export declare const rp: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $rp: () => void;
export declare const rt: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $rt: () => void;
export declare const ruby: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $ruby: () => void;
export declare const s: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $s: () => void;
export declare const samp: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $samp: () => void;
export declare const section: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $section: () => void;
export declare const select: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLSelectElement> | undefined) => void, $select: () => void;
export declare const slot: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLSlotElement> | undefined) => void, $slot: () => void;
export declare const small: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $small: () => void;
export declare const source: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLSourceElement> | undefined) => void, $source: () => void;
export declare const strong: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $strong: () => void;
export declare const sub: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $sub: () => void;
export declare const summary: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $summary: () => void;
export declare const sup: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $sup: () => void;
export declare const table: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLTableElement> | undefined) => void, $table: () => void;
export declare const tbody: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLTableSectionElement> | undefined) => void, $tbody: () => void;
export declare const td: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLTableDataCellElement> | undefined) => void, $td: () => void;
export declare const template: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLTemplateElement> | undefined) => void, $template: () => void;
export declare const textarea: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLTextAreaElement> | undefined) => void, $textarea: () => void;
export declare const tfoot: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLTableSectionElement> | undefined) => void, $tfoot: () => void;
export declare const th: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLTableHeaderCellElement> | undefined) => void, $th: () => void;
export declare const thead: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLTableSectionElement> | undefined) => void, $thead: () => void;
export declare const time: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLTimeElement> | undefined) => void, $time: () => void;
export declare const tr: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLTableRowElement> | undefined) => void, $tr: () => void;
export declare const track: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLTrackElement> | undefined) => void, $track: () => void;
export declare const u: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $u: () => void;
export declare const ul: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLUListElement> | undefined) => void, $ul: () => void;
export declare const video: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLVideoElement> | undefined) => void, $video: () => void;
export declare const wbr: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLElement> | undefined) => void, $wbr: () => void;
export declare const div: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLDivElement> | undefined) => void, $div: () => void;
export declare const span: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<HTMLSpanElement> | undefined) => void, $span: () => void;
export declare const circle: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGCircleElement> | undefined) => void, $circle: () => void;
export declare const clipPath: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGClipPathElement> | undefined) => void, $clipPath: () => void;
export declare const defs: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGDefsElement> | undefined) => void, $defs: () => void;
export declare const desc: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGDescElement> | undefined) => void, $desc: () => void;
export declare const ellipse: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGEllipseElement> | undefined) => void, $ellipse: () => void;
export declare const feBlend: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEBlendElement> | undefined) => void, $feBlend: () => void;
export declare const feColorMatrix: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEColorMatrixElement> | undefined) => void, $feColorMatrix: () => void;
export declare const feComponentTransfer: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEComponentTransferElement> | undefined) => void, $feComponentTransfer: () => void;
export declare const feComposite: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFECompositeElement> | undefined) => void, $feComposite: () => void;
export declare const feConvolveMatrix: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEConvolveMatrixElement> | undefined) => void, $feConvolveMatrix: () => void;
export declare const feDiffuseLighting: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEDiffuseLightingElement> | undefined) => void, $feDiffuseLighting: () => void;
export declare const feDisplacementMap: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEDisplacementMapElement> | undefined) => void, $feDisplacementMap: () => void;
export declare const feDistantLight: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEDistantLightElement> | undefined) => void, $feDistantLight: () => void;
export declare const feFlood: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEFloodElement> | undefined) => void, $feFlood: () => void;
export declare const feFuncA: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEFuncAElement> | undefined) => void, $feFuncA: () => void;
export declare const feFuncB: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEFuncBElement> | undefined) => void, $feFuncB: () => void;
export declare const feFuncG: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEFuncGElement> | undefined) => void, $feFuncG: () => void;
export declare const feFuncR: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEFuncRElement> | undefined) => void, $feFuncR: () => void;
export declare const feGaussianBlur: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEGaussianBlurElement> | undefined) => void, $feGaussianBlur: () => void;
export declare const feImage: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEImageElement> | undefined) => void, $feImage: () => void;
export declare const feMerge: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEMergeElement> | undefined) => void, $feMerge: () => void;
export declare const feMergeNode: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEMergeNodeElement> | undefined) => void, $feMergeNode: () => void;
export declare const feMorphology: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEMorphologyElement> | undefined) => void, $feMorphology: () => void;
export declare const feOffset: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEOffsetElement> | undefined) => void, $feOffset: () => void;
export declare const fePointLight: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFEPointLightElement> | undefined) => void, $fePointLight: () => void;
export declare const feSpecularLighting: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFESpecularLightingElement> | undefined) => void, $feSpecularLighting: () => void;
export declare const feSpotLight: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFESpotLightElement> | undefined) => void, $feSpotLight: () => void;
export declare const feTile: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFETileElement> | undefined) => void, $feTile: () => void;
export declare const feTurbulence: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFETurbulenceElement> | undefined) => void, $feTurbulence: () => void;
export declare const filter: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGFilterElement> | undefined) => void, $filter: () => void;
export declare const foreignObject: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGForeignObjectElement> | undefined) => void, $foreignObject: () => void;
export declare const g: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGGElement> | undefined) => void, $g: () => void;
export declare const image: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGImageElement> | undefined) => void, $image: () => void;
export declare const line: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGLineElement> | undefined) => void, $line: () => void;
export declare const linearGradient: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGLinearGradientElement> | undefined) => void, $linearGradient: () => void;
export declare const marker: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGMarkerElement> | undefined) => void, $marker: () => void;
export declare const mask: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGMaskElement> | undefined) => void, $mask: () => void;
export declare const metadata: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGMetadataElement> | undefined) => void, $metadata: () => void;
export declare const path: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGPathElement> | undefined) => void, $path: () => void;
export declare const pattern: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGPatternElement> | undefined) => void, $pattern: () => void;
export declare const polygon: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGPolygonElement> | undefined) => void, $polygon: () => void;
export declare const polyline: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGPolylineElement> | undefined) => void, $polyline: () => void;
export declare const radialGradient: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGRadialGradientElement> | undefined) => void, $radialGradient: () => void;
export declare const rect: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGRectElement> | undefined) => void, $rect: () => void;
export declare const svg: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGSVGElement> | undefined) => void, $svg: () => void;
export declare const symbol: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGSymbolElement> | undefined) => void, $symbol: () => void;
export declare const text: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGTextElement> | undefined) => void, $text: () => void;
export declare const textPath: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGTextPathElement> | undefined) => void, $textPath: () => void;
export declare const tspan: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGTSpanElement> | undefined) => void, $tspan: () => void;
export declare const use: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGUseElement> | undefined) => void, $use: () => void;
export declare const view: (attrsOrProps?: {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]) | undefined;
    style?: import("./props-and-attrs/style").CSSStyle | import("./props-and-attrs/style").CSSStyle[] | (() => import("./props-and-attrs/style").CSSStyleValue) | undefined;
} | Props<SVGViewElement> | undefined) => void, $view: () => void;
export declare function makeTag<T extends TagName>(tagName: T): [(attrsOrProps?: AttrsOrProps<T>) => void, () => void];
export {};
