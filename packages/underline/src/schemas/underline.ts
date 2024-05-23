import { MarkSpec } from '@edybara/pm/model';

export const edybaraUnderlineMarks = (): Record<string, MarkSpec> => {
  const markSpec: MarkSpec = {
    parseDOM: [{ tag: 'u' }],
    toDOM() {
      return ['u', 0];
    },
  };

  return {
    underline: markSpec,
  };
};
