import { MarkSpec } from '@edybara/pm/model';

export const edybaraCodeMarks = (): Record<string, MarkSpec> => {
  const markSpec: MarkSpec = {
    parseDOM: [{ tag: 'code' }],
    toDOM() {
      return ['code', { class: 'edybara-code' }, 0];
    },
  };

  return {
    code: markSpec,
  };
};
