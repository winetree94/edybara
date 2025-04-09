import React from 'react';
import { classes } from '@edybara/ui';
import { EditorView } from '@edybara/pm/view';
import { useEffect, useRef } from 'react';
import { EditorState } from '@edybara/pm/state';

export interface ProseMirrorProps {
  className?: string;
  state: EditorState;
  style?: React.CSSProperties;
  onStateChange?: (doc: any) => void;
}

export const ProseMirror = (props: ProseMirrorProps) => {
  const editorDomRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    const view = new EditorView(editorDomRef.current, {
      state: props.state,
      ...props,
      attributes: {
        spellcheck: 'false',
      },
      dispatchTransaction(tr) {
        console.log(tr.doc.toJSON());
        view.updateState(view.state.apply(tr));
      },
    });
    editorViewRef.current = view;
    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div
      ref={editorDomRef}
      className={classes('edybara-root', props.className)}
      style={props.style}
    ></div>
  );
};
