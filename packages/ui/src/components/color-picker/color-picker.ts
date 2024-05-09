import { html } from '../../cdk/render';
import { classes } from '../../cdk/utils/core';
import { HTMLAttributes, forwardRef } from 'preact/compat';

export const COLORS = [
  '#182B4D',
  '#0055CC',
  '#206A83',
  '#216E4E',
  '#E56910',
  '#AE2E24',
  '#5E4DB2',
  '#758195',
  '#1D7AFC',
  '#2898BD',
  '#22A06B',
  '#FEA362',
  '#C9372C',
  '#8270DB',
];

export interface EdybaraColorProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

export const EdybaraColor = ({
  className,
  color,
  ...props
}: EdybaraColorProps) => {
  return html`
    <span
      class=${classes('edybara-color', className)}
      style=${{ backgroundColor: color }}
      ...${props}
    />
  `;
};

export interface EdybaraColorPickerProps {
  color?: string;
  onChange?(color: string): void;
}

export const EdybaraColorPicker = forwardRef(
  (props: EdybaraColorPickerProps) => {
    const chunks = COLORS.reduce<string[][]>((result, color, index) => {
      if (index % 7 === 0) {
        result.push([]);
      }
      result[result.length - 1].push(color);
      return result;
    }, []);

    return html`
      <div class=${classes('edybara-color-picker')}>
        ${chunks.map(
          (chunk) => html`
            <div class="edybara-color-group">
              ${chunk.map(
                (color) => html`
                  <${EdybaraColor}
                    color=${color}
                    className=${props.color === color ? 'selected' : ''}
                    onClick=${() => props.onChange?.(color)}
                  />
                `,
              )}
            </div>
          `,
        )}
      </div>
    `;
  },
);
