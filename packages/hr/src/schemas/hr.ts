import { NodeSpec } from '@edybara/pm/model';

export const EDYBARA_HORIZONTAL_RULE_NODE_NAME = 'horizontal_rule';

export interface EdybaraHorizontalRuleNodeConfigs {
  nodeName?: string;
}

const DEFAULT_CONFIGS: Required<EdybaraHorizontalRuleNodeConfigs> = {
  nodeName: EDYBARA_HORIZONTAL_RULE_NODE_NAME,
};

export const edybaraHorizontalRuleNodes = (
  configs?: EdybaraHorizontalRuleNodeConfigs,
): Record<string, NodeSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const nodeSpec: NodeSpec = {
    group: 'block',
    parseDOM: [{ tag: 'hr' }],
    toDOM() {
      return ['hr'];
    },
  };

  return {
    [mergedConfigs.nodeName]: nodeSpec,
  };
};
