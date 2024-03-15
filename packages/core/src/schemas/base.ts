import { NodeSpec } from 'prosemirror-model';

export interface EdybaraBaseNodeConfigs {
  docNodeName?: string;
  textNodeName?: string;
}

export const edybaraBaseNodes = (): Record<string, NodeSpec> => ({
  doc: {
    group: 'block-container',
    content: 'block+',
  },
  text: {
    group: 'inline',
  },
});
