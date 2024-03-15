import { MarkSpec } from 'prosemirror-model';

export const EDIM_SUBSCRIPT_MARK_NAME = 'subscript';

export interface EdybaraSubscriptMarkConfigs {
  /**
   * mark name
   *
   * @default "subscript"
   */
  markName?: string;

  superscriptMarkName?: string;
}

const DEFAULT_CONFIGS: Required<EdybaraSubscriptMarkConfigs> = {
  markName: EDIM_SUBSCRIPT_MARK_NAME,
  superscriptMarkName: '',
};

export const edybaraSubscriptMarks = (
  configs?: EdybaraSubscriptMarkConfigs,
): Record<string, MarkSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const markSpec: MarkSpec = {
    parseDOM: [{ tag: 'sub' }],
    toDOM() {
      return ['sub', 0];
    },
  };

  if (mergedConfigs.superscriptMarkName) {
    markSpec.excludes = mergedConfigs.superscriptMarkName;
  }

  return {
    [mergedConfigs.markName]: markSpec,
  };
};
