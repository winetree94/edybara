import { inputRules, wrappingInputRule } from '@edybara/pm/inputrules';
import { Plugin as PMPlugin } from '@edybara/pm/state';
import { NodeType } from '@edybara/pm/model';

export interface EdybaraBlockquoteInputRulePluginConfigs {
  nodeType: NodeType;
}

export const edybaraBlockquoteInputRulePlugins = (
  configs: EdybaraBlockquoteInputRulePluginConfigs,
): PMPlugin[] => [
  inputRules({
    rules: [
      wrappingInputRule(
        /^\s*>\s$/,
        configs.nodeType,
        { indent: 0 },
        () => false,
      ),
    ],
  }),
];
