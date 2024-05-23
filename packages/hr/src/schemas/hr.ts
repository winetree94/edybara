import { NodeSpec } from '@edybara/pm/model';

export const edybaraHorizontalRuleNodes = (): Record<string, NodeSpec> => {
  const nodeSpec: NodeSpec = {
    group: 'block',
    parseDOM: [{ tag: 'hr' }],
    toDOM() {
      return ['hr'];
    },
  };

  return {
    hr: nodeSpec,
  };
};
