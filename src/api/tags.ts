import { start, end, addScopeId, getCurrentElement, callUpdated } from '@/core';
import { getCurrentComponent } from '@/core/scheduler';
import { forEachObj, isFunction, isOn, parseEventName } from '@/shared';
import { autoUpdate } from './autoUpdate';
import { setAtrrs, Attrs } from './props-and-attrs/attrs';
import { setClass } from './props-and-attrs/class';
import { setEvent } from './props-and-attrs/event';
import { Props, setProps, shouldSetAsProp } from './props-and-attrs/props';
import { setStyle } from './props-and-attrs/style';

type TagName = keyof (HTMLElementTagNameMap & SVGElementTagNameMap);

type AttrsOrProps<
  K extends keyof (HTMLElementTagNameMap & SVGElementTagNameMap)
> = Attrs | Props<(HTMLElementTagNameMap & SVGElementTagNameMap)[K]>;

// HTML or SVG
export const [a, $a] = makeTag('a');
export const [script, $script] = makeTag('script');
export const [style, $style] = makeTag('style');
export const [title, $title] = makeTag('title');

// HTML
export const [address, $address] = makeTag('address');
export const [area, $area] = makeTag('area');
export const [article, $article] = makeTag('article');
export const [aside, $aside] = makeTag('aside');
export const [audio, $audio] = makeTag('audio');
export const [b, $b] = makeTag('b');
export const [base, $base] = makeTag('base');
export const [bdi, $bdi] = makeTag('bdi');
export const [bdo, $bdo] = makeTag('bdo');
export const [blockquote, $blockquote] = makeTag('blockquote');
export const [body, $body] = makeTag('body');
export const [br, $br] = makeTag('br');
export const [button, $button] = makeTag('button');
export const [canvas, $canvas] = makeTag('canvas');
export const [caption, $caption] = makeTag('caption');
export const [cite, $cite] = makeTag('cite');
export const [code, $code] = makeTag('code');
export const [col, $col] = makeTag('col');
export const [colgroup, $colgroup] = makeTag('colgroup');
export const [data, $data] = makeTag('data');
export const [datalist, $datalist] = makeTag('datalist');
export const [dd, $dd] = makeTag('dd');
export const [del, $del] = makeTag('del');
export const [details, $details] = makeTag('details');
export const [dfn, $dfn] = makeTag('dfn');
export const [dialog, $dialog] = makeTag('dialog');
export const [dir, $dir] = makeTag('dir');
export const [dl, $dl] = makeTag('dl');
export const [dt, $dt] = makeTag('dt');
export const [em, $em] = makeTag('em');
export const [embed, $embed] = makeTag('embed');
export const [fieldset, $fieldset] = makeTag('fieldset');
export const [figcaption, $figcaption] = makeTag('figcaption');
export const [figure, $figure] = makeTag('figure');
export const [font, $font] = makeTag('font');
export const [footer, $footer] = makeTag('footer');
export const [form, $form] = makeTag('form');
export const [frame, $frame] = makeTag('frame');
export const [frameset, $frameset] = makeTag('frameset');
export const [h1, $h1] = makeTag('h1');
export const [h2, $h2] = makeTag('h2');
export const [h3, $h3] = makeTag('h3');
export const [h4, $h4] = makeTag('h4');
export const [h5, $h5] = makeTag('h5');
export const [h6, $h6] = makeTag('h6');
export const [head, $head] = makeTag('head');
export const [header, $header] = makeTag('header');
export const [hgroup, $hgroup] = makeTag('hgroup');
export const [hr, $hr] = makeTag('hr');
export const [html, $html] = makeTag('html');
export const [i, $i] = makeTag('i');
export const [iframe, $iframe] = makeTag('iframe');
export const [img, $img] = makeTag('img');
export const [input, $input] = makeTag('input');
export const [ins, $ins] = makeTag('ins');
export const [kbd, $kbd] = makeTag('kbd');
export const [label, $label] = makeTag('label');
export const [legend, $legend] = makeTag('legend');
export const [li, $li] = makeTag('li');
export const [link, $link] = makeTag('link');
export const [main, $main] = makeTag('main');
export const [map, $map] = makeTag('map');
export const [mark, $mark] = makeTag('mark');
export const [marquee, $marquee] = makeTag('marquee');
export const [menu, $menu] = makeTag('menu');
export const [meta, $meta] = makeTag('meta');
export const [meter, $meter] = makeTag('meter');
export const [nav, $nav] = makeTag('nav');
export const [noscript, $noscript] = makeTag('noscript');
export const [object, $object] = makeTag('object');
export const [ol, $ol] = makeTag('ol');
export const [optgroup, $optgroup] = makeTag('optgroup');
export const [option, $option] = makeTag('option');
export const [output, $output] = makeTag('output');
export const [p, $p] = makeTag('p');
export const [param, $param] = makeTag('param');
export const [picture, $picture] = makeTag('picture');
export const [pre, $pre] = makeTag('pre');
export const [progress, $progress] = makeTag('progress');
export const [q, $q] = makeTag('q');
export const [rp, $rp] = makeTag('rp');
export const [rt, $rt] = makeTag('rt');
export const [ruby, $ruby] = makeTag('ruby');
export const [s, $s] = makeTag('s');
export const [samp, $samp] = makeTag('samp');
export const [section, $section] = makeTag('section');
export const [select, $select] = makeTag('select');
export const [slot, $slot] = makeTag('slot');
export const [small, $small] = makeTag('small');
export const [source, $source] = makeTag('source');
export const [strong, $strong] = makeTag('strong');
export const [sub, $sub] = makeTag('sub');
export const [summary, $summary] = makeTag('summary');
export const [sup, $sup] = makeTag('sup');
export const [table, $table] = makeTag('table');
export const [tbody, $tbody] = makeTag('tbody');
export const [td, $td] = makeTag('td');
export const [template, $template] = makeTag('template');
export const [textarea, $textarea] = makeTag('textarea');
export const [tfoot, $tfoot] = makeTag('tfoot');
export const [th, $th] = makeTag('th');
export const [thead, $thead] = makeTag('thead');
export const [time, $time] = makeTag('time');
export const [tr, $tr] = makeTag('tr');
export const [track, $track] = makeTag('track');
export const [u, $u] = makeTag('u');
export const [ul, $ul] = makeTag('ul');
export const [video, $video] = makeTag('video');
export const [wbr, $wbr] = makeTag('wbr');
export const [div, $div] = makeTag('div');
export const [span, $span] = makeTag('span');

// SVG
export const [circle, $circle] = makeTag('circle');
export const [clipPath, $clipPath] = makeTag('clipPath');
export const [defs, $defs] = makeTag('defs');
export const [desc, $desc] = makeTag('desc');
export const [ellipse, $ellipse] = makeTag('ellipse');
export const [feBlend, $feBlend] = makeTag('feBlend');
export const [feColorMatrix, $feColorMatrix] = makeTag('feColorMatrix');
export const [feComponentTransfer, $feComponentTransfer] = makeTag(
  'feComponentTransfer'
);
export const [feComposite, $feComposite] = makeTag('feComposite');
export const [feConvolveMatrix, $feConvolveMatrix] =
  makeTag('feConvolveMatrix');
export const [feDiffuseLighting, $feDiffuseLighting] =
  makeTag('feDiffuseLighting');
export const [feDisplacementMap, $feDisplacementMap] =
  makeTag('feDisplacementMap');
export const [feDistantLight, $feDistantLight] = makeTag('feDistantLight');
export const [feFlood, $feFlood] = makeTag('feFlood');
export const [feFuncA, $feFuncA] = makeTag('feFuncA');
export const [feFuncB, $feFuncB] = makeTag('feFuncB');
export const [feFuncG, $feFuncG] = makeTag('feFuncG');
export const [feFuncR, $feFuncR] = makeTag('feFuncR');
export const [feGaussianBlur, $feGaussianBlur] = makeTag('feGaussianBlur');
export const [feImage, $feImage] = makeTag('feImage');
export const [feMerge, $feMerge] = makeTag('feMerge');
export const [feMergeNode, $feMergeNode] = makeTag('feMergeNode');
export const [feMorphology, $feMorphology] = makeTag('feMorphology');
export const [feOffset, $feOffset] = makeTag('feOffset');
export const [fePointLight, $fePointLight] = makeTag('fePointLight');
export const [feSpecularLighting, $feSpecularLighting] =
  makeTag('feSpecularLighting');
export const [feSpotLight, $feSpotLight] = makeTag('feSpotLight');
export const [feTile, $feTile] = makeTag('feTile');
export const [feTurbulence, $feTurbulence] = makeTag('feTurbulence');
export const [filter, $filter] = makeTag('filter');
export const [foreignObject, $foreignObject] = makeTag('foreignObject');
export const [g, $g] = makeTag('g');
export const [image, $image] = makeTag('image');
export const [line, $line] = makeTag('line');
export const [linearGradient, $linearGradient] = makeTag('linearGradient');
export const [marker, $marker] = makeTag('marker');
export const [mask, $mask] = makeTag('mask');
export const [metadata, $metadata] = makeTag('metadata');
export const [path, $path] = makeTag('path');
export const [pattern, $pattern] = makeTag('pattern');
export const [polygon, $polygon] = makeTag('polygon');
export const [polyline, $polyline] = makeTag('polyline');
export const [radialGradient, $radialGradient] = makeTag('radialGradient');
export const [rect, $rect] = makeTag('rect');
export const [svg, $svg] = makeTag('svg');
export const [symbol, $symbol] = makeTag('symbol');
export const [text, $text] = makeTag('text');
export const [textPath, $textPath] = makeTag('textPath');
export const [tspan, $tspan] = makeTag('tspan');
export const [use, $use] = makeTag('use');
export const [view, $view] = makeTag('view');

export function makeTag<T extends TagName>(
  tagName: T
): [(attrsOrProps?: AttrsOrProps<T>) => void, () => void] {
  return [
    (attrsOrProps?: AttrsOrProps<T>) => {
      start(tagName);
      attrsOrProps && processAttrsOrProps<T>(attrsOrProps);
      addScopeId();
    },
    end,
  ];
}

function processAttrsOrProps<T extends TagName>(attrsOrProps: AttrsOrProps<T>) {
  forEachObj<any, T>(attrsOrProps, (value, key) => {
    switch (key) {
      case 'class':
        processClass(value);
        break;
      case 'style':
        processStyle(value);
        break;
      default:
        if (isOn(key)) {
          processEvent(value, parseEventName(key));
        } else {
          prosessAttrOrProp(value, key);
        }
        break;
    }
  });
}

function processClass(value: any | (() => any)) {
  setClass(value);
}

function processStyle(value: any | (() => any)) {
  setStyle(value);
}

function processEvent(
  listener: any,
  eventName: { name: string; modifier: string[] }
) {
  setEvent(eventName.name, eventName.modifier, listener);
}

function prosessAttrOrProp(value: any, key: string) {
  const el = getCurrentElement() as any;
  if (shouldSetAsProp(el, key, isFunction(value) ? value() : value)) {
    if (isFunction(value)) {
      const currentComponent = getCurrentComponent()!;
      let oldValue: any;
      autoUpdate(() => {
        const newValue = value();
        if (oldValue === newValue) return;
        oldValue = newValue;
        prosessProps(el, newValue, key);
        callUpdated(currentComponent.ulh!);
      });
    } else {
      prosessProps(el, value, key);
    }
  } else {
    if (isFunction(value)) {
      const currentComponent = getCurrentComponent()!;
      let oldValue: any;
      autoUpdate(() => {
        const newValue = value();
        if (oldValue === newValue) return;
        oldValue = newValue;
        prosessAtrrs(el, newValue, key);
        callUpdated(currentComponent.ulh!);
      });
    } else {
      prosessAtrrs(el, value, key);
    }
  }
}

function prosessAtrrs(el: any, value: any, key: string) {
  setAtrrs(el, value, key);
}

function prosessProps(el: any, value: any, key: string) {
  setProps(el, value, key);
}
