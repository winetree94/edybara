import { forwardRef } from 'preact/compat';
import { classes } from '../../cdk/utils/core';
import { JSX } from 'preact';
import { html } from '../../cdk/render';

export interface EdybaraSeparatorProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const EdybaraSeparator = forwardRef<HTMLDivElement, EdybaraSeparatorProps>(
  ({ className, children, ...props }, ref) => {
    return html`
      <div
        class=${classes('edybara-view-separator', className)}
        ...${props}
        ref=${ref}
      >
        ${children}
      </div>
    `;
  },
);
