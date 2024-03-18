import {
  EdybaraAnchor,
  EdybaraLayer,
  EdybaraOverlay,
  EdybaraParagraph,
  html,
} from '@edybara/ui';

export interface EdybaraLinkFloatingLayerProps {
  target: HTMLElement;
  href: string;
}

export const EdybaraLinkFloatingLayer = (props: EdybaraLinkFloatingLayerProps) => {
  return html`
    <${EdybaraOverlay}>
      <${EdybaraLayer} 
        target=${props.target}
        disableBackdrop=${true}
        className="edybara-link-floating-layer-container">
        <${EdybaraParagraph} className="edybara-link-floating-layer-paragraph">
          Visit URL: <${EdybaraAnchor} target="_blank" href="${props.href}">${
            props.href
          }</${EdybaraAnchor}>
          <${EdybaraAnchor}>Edit</${EdybaraAnchor}>
          <${EdybaraAnchor}
            onclick=${() => {
            }}>
            Remove
          </${EdybaraAnchor}>
        </${EdybaraParagraph}>
      </${EdybaraLayer}>
    </${EdybaraOverlay}>
  `;
};
