import { wrappingFlatListInputRule } from '@edybara/flat-list';
import { inputRules } from '@edybara/pm/inputrules';
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
      wrappingFlatListInputRule(/^\[\]\s$/, configs.taskListNodeType, {
        checked: false,
      }),
      wrappingFlatListInputRule(/^\[x\]\s$/, configs.taskListNodeType, {
        checked: true,
      }),
    ],
  }),
];
