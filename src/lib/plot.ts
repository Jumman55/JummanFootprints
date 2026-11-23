// Tiny SVG helpers shared by the interactive lesson diagrams (runs in the browser).
const NS = 'http://www.w3.org/2000/svg';

export const AMBER = '#F2B23E';
export const BLUE = '#7FB2E5';
export const TEXT = '#F3EFE8';
export const DIM = '#8C867E';
export const GRID = 'rgba(255,255,255,0.08)';

type Attrs = Record<string, string | number>;

export function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Attrs = {}, parent?: Element): SVGElementTagNameMap[K] {
  const node = document.createElementNS(NS, tag);
  set(node, attrs);
  parent?.appendChild(node);
  return node;
}

export function set(node: Element, attrs: Attrs) {
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
}

/** Pointer position in the SVG's own coordinates. */
export function svgPoint(svg: SVGSVGElement, e: PointerEvent) {
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  return pt.matrixTransform(svg.getScreenCTM()!.inverse());
}

/** Make `handle` draggable; `move` gets the pointer in SVG coordinates. */
export function draggable(svg: SVGSVGElement, handle: Element, move: (p: DOMPoint) => void) {
  let active = false;
  handle.addEventListener('pointerdown', (e) => {
    const ev = e as PointerEvent;
    active = true;
    (handle as Element).setPointerCapture(ev.pointerId);
    ev.preventDefault();
  });
  handle.addEventListener('pointermove', (e) => {
    if (active) move(svgPoint(svg, e as PointerEvent));
  });
  const stop = () => (active = false);
  handle.addEventListener('pointerup', stop);
  handle.addEventListener('pointercancel', stop);
}

/** Path data for y = f(x) sampled across [x0, x1], mapped with sx/sy. */
export function curve(f: (x: number) => number, x0: number, x1: number, sx: (x: number) => number, sy: (y: number) => number, n = 200) {
  let d = '';
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    d += `${i ? 'L' : 'M'}${sx(x).toFixed(2)},${sy(f(x)).toFixed(2)}`;
  }
  return d;
}

export const fmt = (n: number, digits = 2) => (Math.abs(n) < 1e-9 ? 0 : n).toFixed(digits);

/** Bind a range input to a callback (fires immediately with the current value). */
export function slider(root: Element, name: string, cb: (v: number) => void) {
  const input = root.querySelector<HTMLInputElement>(`input[name="${name}"]`)!;
  const fire = () => cb(Number(input.value));
  input.addEventListener('input', fire);
  return { input, fire, set: (v: number) => { input.value = String(v); } };
}

/** Write text into every element marked data-out="key" inside root. */
export function out(root: Element, key: string, text: string) {
  root.querySelectorAll(`[data-out="${key}"]`).forEach((n) => (n.textContent = text));
}

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
