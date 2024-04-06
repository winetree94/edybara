import { forwardRef } from 'preact/compat';
import { EdybaraSeparator, classes, html } from '@edybara/ui';
import { EdybaraMenubarContext, EdybaraMenubarContextType } from './context';
import { EdybaraMenubarTextTypeSelect } from './text-type';
import { EdybaraMenubarFontFamilySelect } from './font-family';
import { EdybaraMenubarMarkToggleButtons } from './marks';
import { EdybaraMenubarFontColorSelect } from './font-color';
import { EdybaraMenubarTextAlignSelect } from './text-align';
import { EdybaraMenubarListToggleButtons } from './list';
import { EdybaraMenubarTaskListToggleButtons } from './task-list';
import { EdybaraMenubarBlockquoteToggleButtons } from './blockquote';
import { EdybaraMenubarCodeblockToggleButtons } from './codeblock';
import { EdybaraMenubarTableButtons } from './table';
import { EdybaraMenubarLinkButton } from './link';
import { EdybaraMenubarMentionButtons } from './mention';

export const EdybaraMenubar = forwardRef((props: EdybaraMenubarContextType) => {
  const useTextType = !!props.options.textType;
  const useFontFamily = !!props.options.fontFamily;

  return html`
    <${EdybaraMenubarContext.Provider} value="${{
      editorView: props.editorView,
      editorState: props.editorState,
      options: props.options,
    }}">      
      <div className=${classes('edybara-view-menubar-wrapper')}>
        <${EdybaraMenubarTextTypeSelect} />
        <${EdybaraMenubarFontFamilySelect} />
        ${
          useTextType || useFontFamily
            ? html`
                <${EdybaraSeparator}
                  className="edybara-view-menubar-separator"
                />
              `
            : null
        }
        <${EdybaraMenubarMarkToggleButtons} />
        <${EdybaraMenubarFontColorSelect} />
        <${EdybaraMenubarTextAlignSelect} />
        <${EdybaraMenubarListToggleButtons} />

        <${EdybaraMenubarTaskListToggleButtons} />
        <${EdybaraMenubarBlockquoteToggleButtons} />
        <${EdybaraMenubarCodeblockToggleButtons} />
        <${EdybaraMenubarTableButtons} />
        <${EdybaraMenubarLinkButton} />
        <${EdybaraMenubarMentionButtons} />
      </div>
    </${EdybaraMenubarContext.Provider}>
  `;
});
