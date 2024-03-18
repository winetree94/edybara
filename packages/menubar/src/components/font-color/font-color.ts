import { EdybaraMenubarContext } from '../context';
import { useContext } from 'preact/hooks';
import {
  EdybaraColor,
  EdybaraSelect,
  EdybaraSeparator,
  classes,
  html,
} from '@edybara/ui';
import { markActive } from '@edybara/core';
import {
  EdybaraTextColorAttrs,
  EdybaraTextColorMarkType,
  toggleTextColorWithAttrs,
} from '@edybara/text-color';

export const EdybaraMenubarFontColorSelect = () => {
  const context = useContext(EdybaraMenubarContext);

  if (!context.options.textColor) {
    return null;
  }

  const textColorMarkType = context.options.textColor
    .textColorMarkType as EdybaraTextColorMarkType;

  const currentMark = markActive(context.editorView.state, textColorMarkType);
  const currentColor =
    (currentMark?.attrs as EdybaraTextColorAttrs | null)?.color || null;

  return html`
    <${EdybaraSelect.Root} 
      className="${classes('edybara-menubar-color-select')}"
      value="${'black'}"
      onChange="${(color: string) => {
        toggleTextColorWithAttrs(textColorMarkType, {
          color,
        })(context.editorView.state, context.editorView.dispatch);
        context.editorView.focus();
      }}">
      <${EdybaraSelect.Text}>
        <svg 
          className="edybara-color-button-icon"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24">
          <path d="M15.2459 14H8.75407L7.15407 18H5L11 3H13L19 18H16.8459L15.2459 14ZM14.4459 12L12 5.88516L9.55407 12H14.4459ZM3">
          </path>
        </svg>
        <span className="current-font-color" style="${{
          backgroundColor: currentColor || 'black',
        }}"></span>
      </${EdybaraSelect.Text}>
      <${EdybaraSelect.OptionGroup} className="edybara-color-layer-list">
      ${textColorMarkType.spec.colors?.map(
        (color) => html`
        <${EdybaraSelect.Option}
          className="edybara-color-layer-list-item"
          value="${color.color}">
            <${EdybaraColor}
              color=${color.color}
              className=${'context.color' === color.color ? 'selected' : ''}
            />
        </${EdybaraSelect.Option}>
        `,
      )}
      </${EdybaraSelect.OptionGroup}>
    </${EdybaraSelect.Root}>
    <${EdybaraSeparator} className="edybara-view-menubar-separator" />
  `;
};
