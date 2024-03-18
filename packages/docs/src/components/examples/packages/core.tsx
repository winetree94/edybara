import {
  ProseMirror,
  ProseMirrorProps,
} from '@site/src/components/editor/prose-mirror';
import { EditorState, Plugin } from 'prosemirror-state';
import React, { useState } from 'react';
import { Schema } from 'prosemirror-model';
import {
  edybaraBaseNodes,
  edybaraCorePlugins,
  edybaraBasicKeymapPlugins,
  edybaraDropCursorPlugins,
  edybaraGapCursorPlugins,
  edybaraHistoryPlugins,
  edybaraVirtualCursorPlugins,
} from '@edybara/core';
import {
  edybaraParagraphNodes,
  edybaraParagraphPlugins,
} from '@edybara/paragraph';

const schema = new Schema({
  nodes: {
    ...edybaraBaseNodes(),
    ...edybaraParagraphNodes(),
  },
});

const plugins: Plugin[] = [
  ...edybaraParagraphPlugins({
    nodeType: schema.nodes['paragraph'],
  }),
  ...edybaraCorePlugins(),
  // ...edybaraBasicKeymapPlugins(),
  // ...edybaraHistoryPlugins(),
  // ...edybaraVirtualCursorPlugins(),
  // ...edybaraDropCursorPlugins(),
  // ...edybaraGapCursorPlugins(),
];

export const CoreExample = (props: ProseMirrorProps) => {
  const [state] = useState(
    EditorState.create({
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
