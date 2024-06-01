import { inputRules } from '@edybara/pm/inputrules';
import { NodeType } from '@edybara/pm/model';
import { Plugin as PMPlugin } from '@edybara/pm/state';
import { wrappingFlatListInputRule } from '../inputrules';

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
          wrappingFlatListInputRule(/^(\d+)\.\s$/, configs.orderListNodeType),
        ],
      }),
    );
  }

  if (configs.bulletListNodeType) {
    plugins.push(
      inputRules({
        rules: [
          wrappingFlatListInputRule(
            /^\s*([-+*])\s$/,
            configs.bulletListNodeType,
          ),
        ],
      }),
    );
  }

  return plugins;
};
