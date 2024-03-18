import {
  ProseMirror,
  ProseMirrorProps,
} from '@site/src/components/editor/prose-mirror';
import { EditorState, Plugin } from 'prosemirror-state';
import React, { useState } from 'react';
import { Schema } from 'prosemirror-model';
import { edybaraBaseNodes, edybaraCorePlugins } from '@edybara/core';
import {
  edybaraParagraphNodes,
  edybaraParagraphPlugins,
} from '@edybara/paragraph';
import { edybaraMenubarPlugins } from '@edybara/menubar';
import {
  edybaraFlatTaskListNodes,
  edybaraFlatTaskListItemNodes,
  edybaraFlatTaskListPlugins,
} from '@edybara/flat-task-list';

const schema = new Schema({
  nodes: {
    ...edybaraBaseNodes(),
    ...edybaraParagraphNodes(),
    ...edybaraFlatTaskListNodes({
      nodeName: 'task_list',
    }),
    ...edybaraFlatTaskListItemNodes({
      nodeName: 'task_list_item',
    }),
  },
});

const plugins: Plugin[] = [
  ...edybaraParagraphPlugins({
    nodeType: schema.nodes['paragraph'],
  }),
  ...edybaraFlatTaskListPlugins({
    taskListNodeType: schema.nodes['task_list'],
    taskListItemNodeType: schema.nodes['task_list_item'],
  }),
  ...edybaraMenubarPlugins({
    taskList: {
      taskListNodeType: schema.nodes['task_list'],
      taskListItemNodeType: schema.nodes['task_list_item'],
    },
    align: {},
  }),
  ...edybaraCorePlugins(),
];

export const FlatTaskListExample = (props: ProseMirrorProps) => {
  const [state] = useState(
    EditorState.create({
      doc: schema.nodeFromJSON({
        type: 'doc',
        content: [
          {
            type: 'task_list',
            content: [
              {
                type: 'task_list_item',
                attrs: {
                  indent: 1,
                  align: 'left',
                  checked: false,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      align: 'left',
                    },
                    content: [
                      {
                        type: 'text',
                        text: 'asdfa',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'task_list_item',
                attrs: {
                  indent: 2,
                  align: 'left',
                  checked: false,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      align: 'left',
                    },
                    content: [
                      {
                        type: 'text',
                        text: 'asdfasdf',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'task_list_item',
                attrs: {
                  indent: 2,
                  align: 'left',
                  checked: false,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      align: 'left',
                    },
                    content: [
                      {
                        type: 'text',
                        text: 'asdfasdf',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'task_list_item',
                attrs: {
                  indent: 1,
                  align: 'left',
                  checked: true,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      align: 'left',
                    },
                    content: [
                      {
                        type: 'text',
                        text: 'asdfasdfasdf',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'task_list_item',
                attrs: {
                  indent: 1,
                  align: 'left',
                  checked: true,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      align: 'left',
                    },
                    content: [
                      {
                        type: 'text',
                        text: 'asdfas',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'task_list_item',
                attrs: {
                  indent: 2,
                  align: 'left',
                  checked: false,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      align: 'left',
                    },
                    content: [
                      {
                        type: 'text',
                        text: 'fdasdf',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'task_list_item',
                attrs: {
                  indent: 2,
                  align: 'left',
                  checked: false,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      align: 'left',
                    },
                    content: [
                      {
                        type: 'text',
                        text: 'asdfasdf',
                      },
                    ],
                  },
                ],
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
