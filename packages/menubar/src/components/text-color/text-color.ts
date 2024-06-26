import { EdybaraMenubarContext } from '../context';
import { useContext } from 'preact/hooks';
import {
  EdybaraColor,
  EdybaraSelect,
  EdybaraSeparator,
  classes,
  html,
} from '@edybara/ui';
import { selectionAllTextHasMark } from '@edybara/core';
import {
  EdybaraTextColorAttrs,
  EdybaraTextColorMarkType,
  setTextColor,
} from '@edybara/text-color';

export const EdybaraMenubarTextColorSelect = () => {
  const context = useContext(EdybaraMenubarContext);

  if (!context.options.textColor) {
    return null;
  }

  const textColorMarkType = context.options.textColor
    .textColorMarkType as EdybaraTextColorMarkType;

  const colorMarks = selectionAllTextHasMark(
    context.editorView.state,
    textColorMarkType,
  );

  let currentColor: string | null = null;

  if (
    colorMarks
      ?.map((mark) => (mark.attrs as EdybaraTextColorAttrs).color)
      .filter((color, index, self) => self.indexOf(color) === index).length ===
    1
  ) {
    currentColor = (colorMarks[0].attrs as EdybaraTextColorAttrs).color;
  }

  return html`
    <${EdybaraSelect.Root} 
      className="${classes('edybara-menubar-color-select')}"
      value="${'black'}"
      onChange="${(color: string) => {
        setTextColor(textColorMarkType, {
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
