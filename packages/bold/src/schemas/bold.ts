import { MarkSpec } from '@edybara/pm/model';

export const edybaraBoldMarks = (): Record<string, MarkSpec> => {
  /// A strong mark. Rendered as `<strong>`, parse rules also match
  /// `<b>` and `font-weight: bold`.
  const markSpec: MarkSpec = {
    parseDOM: [
      { tag: 'strong' },
      // This works around a Google Docs misbehavior where
      // pasted content will be inexplicably wrapped in `<b>`
      // tags with a font-weight normal.
      {
        tag: 'b',
        getAttrs: (node) => {
          const dom = node;
          return dom.style.fontWeight != 'normal' && null;
        },
      },
      { style: 'font-weight=400', clearMark: (m) => m.type.name == 'strong' },
      {
        style: 'font-weight',
        getAttrs: (node) => {
          const value = node;
          return /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null;
        },
      },
    ],
    toDOM() {
      return [
        'strong',
        {
          class: 'edybara-bold',
        },
        0,
      ];
    },
  };

  return {
    bold: markSpec,
  };
};
