import { ComponentChildren, createContext } from 'preact';
import { useContext, useEffect, useRef, useState } from 'preact/compat';
import { EdybaraOverlay, html } from '../../cdk';

interface EdybaraPopoverOpenedState {
  triggerRef: HTMLElement | null;
}

interface EdybaraPopoverContextType {
  opened: EdybaraPopoverOpenedState | null;
  setOpened: (opened: EdybaraPopoverOpenedState | null) => void;
}

const EdybaraPopoverContext = createContext<EdybaraPopoverContextType>({
  opened: null,
  setOpened: () => {},
});

export interface EdybaraPopoverRootProps {
  children: ComponentChildren;
}

const EdybaraPopoverRoot = (props: EdybaraPopoverRootProps) => {
  const [opened, setOpened] = useState<EdybaraPopoverOpenedState | null>(null);

  return html`
    <${EdybaraPopoverContext.Provider} value="${{
      opened: opened,
      setOpened: setOpened,
    }}">
      ${props.children}
    </${EdybaraPopoverContext.Provider}>
  `;
};

export interface EdybaraPopoverTriggerProps {
  children: ComponentChildren;
}

const EdybaraPopoverTrigger = (props: EdybaraPopoverTriggerProps) => {
  const context = useContext(EdybaraPopoverContext);
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    const element = ref.current;
    if (!element || !(element instanceof HTMLElement)) {
      return;
    }
    if (context.opened && context.opened.triggerRef !== element) {
      context.setOpened({
        ...context.opened,
        triggerRef: element,
      });
    }
    const onClick = () => {
      context.setOpened({
        triggerRef: element,
      });
    };
    element.addEventListener('click', onClick);
    return () => {
      element.removeEventListener('click', onClick);
    };
  }, [ref.current]);

  // const childrenWithProps = Children.map(props.children, (child) => {
  //   return cloneElement(child, { ...child.props, ref });
  // });

  return html`${props.children}`;
};

export interface EdybaraPopoverPortalProps {
  children: ComponentChildren;
}

const EdybaraPopoverPortal = (props: EdybaraPopoverPortalProps) => {
  const context = useContext(EdybaraPopoverContext);
  if (!context.opened) {
    return null;
  }
  return html`
    <${EdybaraOverlay}>
      ${props.children}
    </${EdybaraOverlay}>
  `;
};

export interface EdybaraPopoverContentProps {
  children: ComponentChildren;
}

const EdybaraPopoverContent = (props: EdybaraPopoverContentProps) => {
  return html`<div className="edybara-popover-content">${props.children}</div>`;
};

export const EdybaraPopover = {
  Root: EdybaraPopoverRoot,
  Trigger: EdybaraPopoverTrigger,
  Portal: EdybaraPopoverPortal,
  Content: EdybaraPopoverContent,
};
