import { Plugin as PMPlugin } from '@edybara/pm/state';
import { NodeType } from '@edybara/pm/model';
import { inputRules, textblockTypeInputRule } from '@edybara/pm/inputrules';
import { EdybaraHeadingNodeSpec } from '../schemas';

export interface EdybaraHeadingInputRulePluginConfigs {
  nodeType: NodeType;
}

export const edybaraHeadingInputRulePlugins = (
  configs: EdybaraHeadingInputRulePluginConfigs,
): PMPlugin[] => {
  const levels = (configs.nodeType.spec as EdybaraHeadingNodeSpec).meta.levels;
  const levelRegex = levels.map((level) => `#{${level}}`).join('|');
  return [
    inputRules({
      rules: [
        textblockTypeInputRule(
          new RegExp(`^(${levelRegex})\\s`),
          configs.nodeType,
          (match) => ({ level: match[1].length }),
        ),
      ],
    }),
  ];
};
