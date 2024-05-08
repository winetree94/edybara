import { Plugin as PMPlugin, PluginKey } from '@edybara/pm/state';
import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { json } from '@codemirror/lang-json';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'preact/compat';
import { html } from '@edybara/ui';
import { render } from 'preact';

export interface CodeMirrorProps {
  className?: string;
  values?: string;
  onStateChange?: (doc: any) => void;
}

export interface CodeMirrorRef {
  view: EditorView | null;
}

export const CodeMirror = forwardRef<CodeMirrorRef, CodeMirrorProps>(
  (props, ref) => {
    const wrapper = useRef<HTMLDivElement>(null);
    const [editorViewRef, setEditorViewRef] = useState<EditorView | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        view: editorViewRef,
      }),
      [editorViewRef],
    );

    useEffect(() => {
      const view = new EditorView({
        extensions: [basicSetup, json(), EditorState.readOnly.of(true)],
        parent: wrapper.current!,
        doc: props.values || '',
      });
      setEditorViewRef(view);
      return () => {
        view.destroy();
      };
    }, []);

    useEffect(() => {
      if (!editorViewRef) {
        return;
      }
      editorViewRef.dispatch({
        changes: {
          from: 0,
          to: editorViewRef.state.doc.length,
          insert: props.values || '',
        },
      });
    }, [props.values]);

    return html`<div
      className="edybara-devkit-codemirror-wrapper"
      ref=${wrapper}
    ></div> `;
  },
);

export const edybaraDevkitCodeMirrorPlugins = (): PMPlugin[] => {
  const plugin = new PMPlugin({
    key: new PluginKey('edybaraDevkitToolbar'),
    view: (editorView) => {
      let root = editorView.dom.parentElement!;

      while (root.className !== 'edybara-root') {
        if (!root) {
          return {};
        }
        if (root.classList.contains('edybara-root')) {
          break;
        }
        root = root.parentElement!;
      }

      if (!root) {
        return {};
      }

      const wrapper = document.createElement('div');
      wrapper.classList.add('edybara-devkit-codemirror-container');
      root.appendChild(wrapper);

      const renderToolbar = (values: string) =>
        render(
          html`<${CodeMirror} editorView=${editorView} values=${values} />`,
          wrapper,
        );

      renderToolbar(JSON.stringify(editorView.state.doc.toJSON(), null, 2));
      return {
        update: (view) =>
          renderToolbar(JSON.stringify(view.state.doc.toJSON(), null, 2)),
        destroy: () => render(null, wrapper),
      };
    },
  });
  return [plugin];
};
