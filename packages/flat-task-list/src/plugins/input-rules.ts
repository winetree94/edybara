import { inputRules } from '@edybara/pm/inputrules';
import { NodeType } from '@edybara/pm/model';
import { wrappingInputRuleWithJoin } from '@edybara/core';
import { Plugin } from '@edybara/pm/state';

export interface EdybaraTaskListInputRulePluginConfigs {
  taskListNodeType: NodeType;
}

export const edybaraTaskListInputRulePlugins = (
  configs: EdybaraTaskListInputRulePluginConfigs,
): Plugin[] => [
  inputRules({
    rules: [
      wrappingInputRuleWithJoin(/^\[\]\s$/, configs.taskListNodeType, {
        indent: 0,
      }),
      wrappingInputRuleWithJoin(
        /^\[x\]\s$/,
        configs.taskListNodeType,
        {
          indent: 0,
        },
        null,
        (wrappings) => {
          const [list, listItem] = wrappings;
          return [
            list,
            {
              ...listItem,
              attrs: {
                checked: true,
              },
            },
          ];
        },
      ),
    ],
  }),
];
