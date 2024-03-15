import { forwardRef } from 'preact/compat';
import { classes, html } from '../../cdk';
import { JSX } from 'preact';

export interface EdybaraButtonProps
  extends JSX.HTMLAttributes<HTMLButtonElement> {}

export const EdybaraButton = forwardRef<HTMLButtonElement, EdybaraButtonProps>(
  ({ className, children, ...props }, ref) => {
    return html`
      <button
        class="${classes('edybara-button', className)}"
        ...${props}
        ref="${ref}"
      >
        ${children}
      </button>
    `;
  },
);
