import { forwardRef, HTMLAttributes } from 'preact/compat';
import { classes, html } from '../../cdk';

export const EdybaraHeading1 = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
  return html`
    <h1
      className="${classes('edybara-ui-h1', className)}"
      ...${props}
      ref=${ref}
    >
      ${children}
    </h1>
  `;
});

export const EdybaraHeading2 = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
  return html`
    <h2
      className="${classes('edybara-ui-h2', className)}"
      ...${props}
      ref=${ref}
    >
      ${children}
    </h2>
  `;
});

export const EdybaraHeading3 = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
  return html`
    <h3
      className="${classes('edybara-ui-h3', className)}"
      ...${props}
      ref=${ref}
    >
      ${children}
    </h3>
  `;
});

export const EdybaraHeading4 = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
  return html`
    <h4
      className="${classes('edybara-ui-h4', className)}"
      ...${props}
      ref=${ref}
    >
      ${children}
    </h4>
  `;
});

export const EdybaraHeading5 = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
  return html`
    <h5
      className="${classes('edybara-ui-h5', className)}"
      ...${props}
      ref=${ref}
    >
      ${children}
    </h5>
  `;
});

export const EdybaraHeading6 = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
  return html`
    <h6
      className="${classes('edybara-ui-h6', className)}"
      ...${props}
      ref=${ref}
    >
      ${children}
    </h6>
  `;
});

export const EdybaraHeadingByNumber = {
  1: EdybaraHeading1,
  2: EdybaraHeading2,
  3: EdybaraHeading3,
  4: EdybaraHeading4,
  5: EdybaraHeading5,
  6: EdybaraHeading6,
};
