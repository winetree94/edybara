import { Plugin as PMPlugin } from '@edybara/pm/state';
import { InputRule, inputRules } from '@edybara/pm/inputrules';
import { MarkType } from '@edybara/pm/model';

export interface EdybaraCodeInputRulePluginConfigs {
  markType: MarkType;
}

export const edybaraCodeInputRulePlugins = (
  configs: EdybaraCodeInputRulePluginConfigs,
): PMPlugin[] => [
  inputRules({
    rules: [
      new InputRule(/`(.+)`$/, (state, match, start, end) => {
        return state.tr
          .replaceRangeWith(
            start,
            end,
            state.schema.text(match[1], [configs.markType.create()]),
          )
          .removeStoredMark(configs.markType)
          .insertText('\u200B', end - 1);
      }),
    ],
  }),
];
