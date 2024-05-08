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
import { edybaraMenubarPlugins } from '@edybara/menubar';
import {
  edybaraTableEditingPlugins,
  edybaraTableNodes,
  edybaraTablePlugins,
} from '@edybara/tables';

const schema = new Schema({
  nodes: {
    ...edybaraBaseNodes(),
    ...edybaraParagraphNodes(),
    ...edybaraTableNodes({
      tableNodeName: 'table',
      tableRowNodeName: 'table_row',
      tableCellNodeName: 'table_cell',
    }),
  },
});

const plugins: Plugin[] = [
  ...edybaraParagraphPlugins({
    nodeType: schema.nodes.paragraph,
  }),
  ...edybaraTablePlugins({
    tableNodeType: schema.nodes.table,
    tableRowNodeType: schema.nodes.table_row,
    tableCellNodeType: schema.nodes.table_cell,
  }),
  ...edybaraTableEditingPlugins({
    tableNodeType: schema.nodes.table,
    tableRowNodeType: schema.nodes.table_row,
    tableCellNodeType: schema.nodes.table_cell,
  }),
  ...edybaraMenubarPlugins({
    table: {
      tableNodeType: schema.nodes.table,
    },
  }),
  ...edybaraCorePlugins(),
];

export const TableExample = (props: ProseMirrorProps) => {
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
