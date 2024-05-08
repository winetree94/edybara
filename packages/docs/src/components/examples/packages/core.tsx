import {
  ProseMirror,
  ProseMirrorProps,
} from '@site/src/components/editor/prose-mirror';
import { EditorState } from '@edybara/pm/state';
import React, { useRef, useState } from 'react';
import { Schema } from '@edybara/pm/model';
import { edybaraBaseNodes, edybaraCorePlugins } from '@edybara/core';
import {
  edybaraParagraphNodes,
  edybaraParagraphPlugins,
} from '@edybara/paragraph';
import { edybaraDevkitCodeMirrorPlugins } from '@edybara/devkit';

export const CoreExample = (props: ProseMirrorProps) => {
  const schema = useRef(
    new Schema({
      nodes: {
        ...edybaraBaseNodes(),
        ...edybaraParagraphNodes(),
      },
    }),
  );

  const plugins = useRef([
    ...edybaraParagraphPlugins({
      nodeType: schema.current.nodes['paragraph'],
    }),
    ...edybaraCorePlugins(),
    ...edybaraDevkitCodeMirrorPlugins(),
  ]);

  const [state] = useState(
    EditorState.create({
      schema: schema.current,
      plugins: plugins.current,
    }),
  );

  return <ProseMirror state={state} {...props} />;
};
