import { EdybaraButton, html } from '@edybara/ui';
import { EdybaraMenubarContext } from '../context';
import { useContext } from 'preact/hooks';
import { setBlockquote } from '@edybara/blockquote';

export const EdybaraMenubarBlockquoteToggleButtons = () => {
  const context = useContext(EdybaraMenubarContext);

  if (!context.options.blockquote) {
    return null;
  }

  const blockquoteNodeType = context.options.blockquote.blockQuoteNodeType;

  return html`
    <${EdybaraButton}
      className="edybara-icon-button"
      onClick=${() => {
        setBlockquote(blockquoteNodeType)(
          context.editorView.state,
          context.editorView.dispatch,
        );
      }}>
      <i class="ri-double-quotes-r"></i>
    </${EdybaraButton}>
  `;
};
