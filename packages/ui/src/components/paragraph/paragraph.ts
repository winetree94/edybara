import { forwardRef, HTMLAttributes } from 'preact/compat';
import { classes } from '../../cdk/utils/core';
import { html } from '../../cdk/render';

export interface EdybaraParagraphProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export const EdybaraParagraph = forwardRef<HTMLParagraphElement, EdybaraParagraphProps>(
  ({ className, children, ...props }, ref) => {
    return html`
      <p
        class=${classes('edybara-view-paragraph', className)}
        ...${props}
        ref=${ref}
      >
        ${children}
      </p>
    `;
  },
);
