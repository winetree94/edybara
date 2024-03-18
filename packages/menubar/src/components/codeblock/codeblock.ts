import { EdybaraButton, html } from '@edybara/ui';
import { EdybaraMenubarContext } from '../context';
import { useContext } from 'preact/hooks';
import { setBlockType } from 'prosemirror-commands';

export const EdybaraMenubarCodeblockToggleButtons = () => {
  const context = useContext(EdybaraMenubarContext);

  if (!context.options.codeblock) {
    return null;
  }

  const codeblockNodeType = context.options.codeblock.codeBlockNodeType;

  return html`
    <${EdybaraButton}
      className="edybara-icon-button"
      onClick=${() => {
        setBlockType(codeblockNodeType)(
          context.editorView.state,
          context.editorView.dispatch,
        );
      }}>
      <i class="ri-code-s-slash-line"></i>
    </${EdybaraButton}>
  `;
};
