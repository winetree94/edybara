import { DOMOutputSpec, NodeSpec } from '@edybara/pm/model';

const preDOM: DOMOutputSpec = [
  'pre',
  { class: 'edybara-codeblock-wrapper' },
  [
    'code',
    {
      class: 'edybara-codeblock-code',
    },
    0,
  ],
];

export const edybaraCodeBlockNodes = (): Record<string, NodeSpec> => {
  const nodeSpec: NodeSpec = {
    content: 'text*',
    marks: '',
    group: 'block',
    code: true,
    defining: true,
    parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
    toDOM() {
      return preDOM;
    },
  };

  return {
    code_block: nodeSpec,
  };
};
