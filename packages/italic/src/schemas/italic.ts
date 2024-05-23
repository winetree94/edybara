import { MarkSpec } from '@edybara/pm/model';

export const edybaraItalicMarks = (): Record<string, MarkSpec> => {
  const markSpec: MarkSpec = {
    parseDOM: [
      { tag: 'i' },
      { tag: 'em' },
      { style: 'font-style=italic' },
      { style: 'font-style=normal', clearMark: (m) => m.type.name == 'italic' },
    ],
    toDOM() {
      return ['em', 0];
    },
  };

  return {
    italic: markSpec,
  };
};
