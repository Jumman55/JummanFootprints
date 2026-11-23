// Turns lesson text into HTML at build time:
//   $$...$$ → display maths, $...$ → inline maths (KaTeX),
//   **bold**, _italic_, blank line → new paragraph, [text](url) → link.
import katex from 'katex';

const tex = (src: string, display: boolean) =>
  katex.renderToString(src, { displayMode: display, throwOnError: false, output: 'html' });

function inline(s: string): string {
  // Pull maths out first so ** and _ inside formulas are left alone.
  const parts: string[] = [];
  s = s.replace(/\$([^$]+)\$/g, (_, m) => {
    parts.push(tex(m, false));
    return `\u0000${parts.length - 1}\u0000`;
  });
  s = s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])_(.+?)_(?=[\s.,;:!?)]|$)/g, '$1<em>$2</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => parts[+i]);
}

/** Rich block text: paragraphs and display maths. */
export function rich(src: string): string {
  return src
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const b = block.trim();
      const display = b.match(/^\$\$([\s\S]+)\$\$$/);
      if (display) return `<div class="math-display">${tex(display[1], true)}</div>`;
      return `<p>${inline(b)}</p>`;
    })
    .join('');
}

/** Single-line rich text (quiz questions, options). */
export const richInline = (src: string) => inline(src);
