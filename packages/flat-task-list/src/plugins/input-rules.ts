import { inputRules } from 'prosemirror-inputrules';
import { NodeType } from 'prosemirror-model';
import { wrappingInputRuleWithJoin } from '@edybara-editor/core';
import { Plugin } from 'prosemirror-state';

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
