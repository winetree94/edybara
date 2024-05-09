import { forwardRef, HTMLAttributes } from 'preact/compat';
import { classes } from '../../cdk/utils/core';
import { html } from '../../cdk/render';

export interface EdybaraLabelProps extends HTMLAttributes<HTMLLabelElement> {}

export const EdybaraLabel = forwardRef<HTMLLabelElement, EdybaraLabelProps>(
  ({ className, children, ...props }, ref) => {
    return html`
      <label
        class=${classes('edybara-label', className)}
        ...${props}
        ref=${ref}
      >
        ${children}
      </label>
    `;
  },
);
