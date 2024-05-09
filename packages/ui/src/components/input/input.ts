import { forwardRef, HTMLAttributes } from 'preact/compat';
import { classes } from '../../cdk/utils/core';
import { html } from '../../cdk/render';

export interface EdybaraInputProps extends HTMLAttributes<HTMLInputElement> {}

export const EdybaraInput = forwardRef<HTMLInputElement, EdybaraInputProps>(
  ({ className, ...props }, ref) => {
    return html`
      <input
        class=${classes('edybara-input', className)}
        ...${props}
        ref=${ref}
      />
    `;
  },
);
