import {
  ProseMirror,
  ProseMirrorProps,
} from '@site/src/components/editor/prose-mirror';
import { EditorState } from 'prosemirror-state';
import React, { useState } from 'react';
import { edybaraPresetSchema, edybaraPresetPlugins } from '@edybara/preset';
import doc from '@site/src/pages/lorem-ipsum.json';
import { Node } from 'prosemirror-model';

const schema = edybaraPresetSchema();
const plugins = edybaraPresetPlugins({
  schema,
});

export const Maximum = (props: ProseMirrorProps) => {
  const [state] = useState(
    EditorState.create({
      doc: Node.fromJSON(schema, doc),
      schema: schema,
      plugins: plugins,
    }),
  );

  return <ProseMirror state={state} {...props} />;
};
