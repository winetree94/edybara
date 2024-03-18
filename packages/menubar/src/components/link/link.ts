
import { Fragment } from 'preact';
import { useContext, useRef, useState } from 'preact/hooks';
import { EdybaraButton, EdybaraLayer, html } from '@edybara/ui';
import { EdybaraLinkFormLayer, addLink } from '@edybara/link';
import { EdybaraMenubarContext } from '../context';

export const EdybaraMenubarLinkButton = () => {
  const ref = useRef<HTMLButtonElement>();
  const context = useContext(EdybaraMenubarContext);

  if (!context.options.link) {
    return null;
  }

  const [linkLayerRef, setLinkLayerRef] = useState<{
    top: number;
    left: number;
    from: number;
    to: number;
    link: string;
    text: string;
  } | null>(null);

  return html`
    <${Fragment}>
      <${EdybaraButton}
        ref=${ref}
        className="edybara-icon-button"
        onClick=${() => {
          const { from, to } = context.editorView.state.selection;
          const start = context.editorView.coordsAtPos(from);
          const end = context.editorView.coordsAtPos(to);
          setLinkLayerRef({
            top: end.bottom + 10,
            left: start.left,
            from,
            to,
            link: '',
            text: context.editorView.state.doc.textBetween(from, to),
          });
        }}>
        <i class="ri-links-line"></i>
      </${EdybaraButton}>
      ${
        linkLayerRef &&
        html`
        <${EdybaraLayer}
          target=${ref.current}
          closeOnEsc=${true}
          outerMousedown=${() => setLinkLayerRef(null)}
          onClose=${() => setLinkLayerRef(null)}
          >
          <${EdybaraLinkFormLayer}
            text=${linkLayerRef.text}
            link=${linkLayerRef.link}
            onSubmit=${(link: string, text: string) => {
              setLinkLayerRef(null);
              const { from, to } = context.editorView.state.selection;
              let tr = context.editorView.state.tr;
              tr = addLink(tr, from, to, text, link);
              context.editorView.dispatch(tr);
              context.editorView.focus();
            }}
            onCancel=${() => setLinkLayerRef(null)}
            />
        </${EdybaraLayer}>
      `
      }
    </${Fragment}> 
  `;
};
