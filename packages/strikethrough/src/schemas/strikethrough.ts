import { MarkSpec } from '@edybara/pm/model';

export const edybaraStrikethroughMarks = (): Record<string, MarkSpec> => {
  const markSpec: MarkSpec = {
    parseDOM: [{ tag: 's' }],
    toDOM() {
      return ['s', 0];
    },
  };

  return {
    strikethrough: markSpec,
  };
};
