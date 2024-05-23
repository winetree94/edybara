import { MarkSpec } from '@edybara/pm/model';

export const edybaraLinkMarks = (): Record<string, MarkSpec> => {
  const markSpec: MarkSpec = {
    attrs: {
      href: { default: null },
      title: { default: null },
    },
    // inclusive: false,
    parseDOM: [
      {
        tag: 'a[href]',
        getAttrs(node) {
          const dom = node;
          return {
            href: dom.getAttribute('href'),
            title: dom.getAttribute('title'),
          };
        },
      },
    ],
    toDOM(node) {
      const href = node.attrs['href'] as string;
      const title = node.attrs['title'] as string;
      return ['a', { href, title, class: 'edybara-link' }, 0];
    },
  };

  return {
    link: markSpec,
  };
};
