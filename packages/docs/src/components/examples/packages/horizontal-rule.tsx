import {
  ProseMirror,
  ProseMirrorProps,
} from '@site/src/components/editor/prose-mirror';
import { EditorState, Plugin } from '@edybara/pm/state';
import React, { useState } from 'react';
import { Schema } from '@edybara/pm/model';
import { edybaraBaseNodes, edybaraCorePlugins } from '@edybara/core';
import {
  edybaraParagraphNodes,
  edybaraParagraphPlugins,
} from '@edybara/paragraph';
import {
  edybaraHorizontalRuleNodes,
  edybaraHorizontalRulePlugins,
} from '@edybara/hr';

const schema = new Schema({
  nodes: {
    ...edybaraBaseNodes(),
    ...edybaraParagraphNodes({
      allowAlign: true,
    }),
    ...edybaraHorizontalRuleNodes(),
  },
});

const plugins: Plugin[] = [
  ...edybaraParagraphPlugins({
    nodeType: schema.nodes['paragraph'],
  }),
  ...edybaraHorizontalRulePlugins({
    nodeType: schema.nodes['horizontal_rule'],
  }),
  ...edybaraCorePlugins(),
];

export const HorizontalRuleExample = (props: ProseMirrorProps) => {
  const [state] = useState(
    EditorState.create({
      doc: schema.nodeFromJSON({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is a minimal example of a ProseMirror editor with a few plugins.',
              },
            ],
          },
        ],
      }),
      schema: schema,
      plugins: plugins,
    }),
  );

  return (
    <ProseMirror
      state={state}
      style={{ height: '300px' }}
      className="border"
      {...props}
    />
  );
};
