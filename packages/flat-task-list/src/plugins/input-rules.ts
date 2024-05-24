import { inputRules, wrappingInputRule } from '@edybara/pm/inputrules';
import { NodeType } from '@edybara/pm/model';
import { Plugin } from '@edybara/pm/state';

export interface EdybaraTaskListInputRulePluginConfigs {
  taskListNodeType: NodeType;
}

export const edybaraTaskListInputRulePlugins = (
  configs: EdybaraTaskListInputRulePluginConfigs,
): Plugin[] => [
  inputRules({
    rules: [
      wrappingInputRule(/^\[\]\s$/, configs.taskListNodeType, {
        indent: 0,
      }),
      wrappingInputRule(/^\[x\]\s$/, configs.taskListNodeType, {
        indent: 0,
        checked: false,
      }),
    ],
  }),
];
