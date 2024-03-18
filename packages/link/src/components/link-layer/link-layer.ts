import { useEffect, useRef, useState } from 'preact/hooks';
import { EdybaraButton, EdybaraInput, EdybaraLabel, html } from '@edybara/ui';
import { forwardRef } from 'preact/compat';

export interface EdybaraLinkFormProps {
  link?: string;
  text?: string;
  onCancel?(): void;
  onSubmit?(link: string, text: string): void;
}

export const EdybaraLinkFormLayer = forwardRef((props: EdybaraLinkFormProps) => {
  const linkRef = useRef<HTMLInputElement>(null);
  const [link, setLink] = useState<string>(props.link || '');
  const [text, setText] = useState<string>(props.text || '');

  useEffect(() => {
    if (linkRef.current) {
      linkRef.current.focus();
    }
  }, []);

  return html`
    <form
      onSubmit=${() => props.onSubmit?.(link, text)}
      className="edybara-link-wrapper"
    >
      <${EdybaraLabel}>Link<//>
      <${EdybaraInput}
        ref=${linkRef}
        type="text"
        value=${link}
        onInput=${(e: Event) => {
          const target = e.target as HTMLInputElement;
          setLink(target.value);
        }}
      />
      <${EdybaraLabel}>Text (Optional)<//>
      <${EdybaraInput}
        type="text"
        value=${text}
        onInput=${(e: Event) => {
          const target = e.target as HTMLInputElement;
          setText(target.value);
        }}
      />
      <div className="edybara-link-buttons">
        <${EdybaraButton} disabled=${!link} className="laksdjfsa" type="submit">
          submit
        <//>
        <${EdybaraButton} onClick=${() => props.onCancel?.()}>cancel<//>
      </div>
    </form>
  `;
});
