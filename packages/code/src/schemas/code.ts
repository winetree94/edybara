import { MarkSpec } from 'prosemirror-model';

export const EDIM_CODE_MARK_NAME = 'code';

export interface EdybaraCodeMarkConfigs {
  markName?: string;
}

const DEFAULT_CONFIGS: Required<EdybaraCodeMarkConfigs> = {
  markName: EDIM_CODE_MARK_NAME,
};

export const edybaraCodeMarks = (
  configs?: EdybaraCodeMarkConfigs,
): Record<string, MarkSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const markSpec: MarkSpec = {
    parseDOM: [{ tag: 'code' }],
    toDOM() {
      return ['code', { class: 'edybara-code' }, 0];
    },
  };

  return {
    [mergedConfigs.markName]: markSpec,
  };
};
