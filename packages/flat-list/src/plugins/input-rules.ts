import { inputRules, wrappingInputRule } from '@edybara/pm/inputrules';
import { NodeType } from '@edybara/pm/model';
import { Plugin as PMPlugin } from '@edybara/pm/state';

export interface EdybaraFlatListInputRulePluginConfigs {
  orderListNodeType?: NodeType;
  bulletListNodeType?: NodeType;
}

export const edybaraFlatListInputRulePlugins = (
  configs: EdybaraFlatListInputRulePluginConfigs,
): PMPlugin[] => {
  const plugins: PMPlugin[] = [];

  if (configs.orderListNodeType) {
    plugins.push(
      inputRules({
        rules: [
          wrappingInputRule(/^(\d+)\.\s$/, configs.orderListNodeType, {
            indent: 0,
          }),
        ],
      }),
    );
  }

  if (configs.bulletListNodeType) {
    plugins.push(
      inputRules({
        rules: [
          wrappingInputRule(/^\s*([-+*])\s$/, configs.bulletListNodeType, {
            indent: 0,
          }),
        ],
      }),
    );
  }

  return plugins;
};
