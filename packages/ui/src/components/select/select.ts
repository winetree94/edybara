import { ComponentChildren } from 'preact';
import { classes, html, EdybaraOverlay } from '../../cdk';
import {
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'preact/compat';
import { EdybaraLayer } from '../layer';
import { EdybaraListItem, EdybaraUnorderedList } from '../list';
import { EdybaraButton } from '../button';

interface EdybaraSelectContextValue {
  opened: { target: HTMLElement } | null;
  value: string;
  onSelect: (value: string) => void;
  close: () => void;
}

const EdybaraSelectContext = createContext<EdybaraSelectContextValue>({
  opened: null,
  value: '',
  onSelect: () => {},
  close: () => {},
});

export interface EdybaraSelectProps {
  children: ComponentChildren;
  value: string;
  className: string;
  hideArrow?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const EdybaraSelectRoot = forwardRef<HTMLDivElement, EdybaraSelectProps>(
  ({ children, className, ...props }, ref) => {
    const wrapperRef = useRef<HTMLDivElement>();
    const [opened, setOpened] = useState<{ target: HTMLElement } | null>(null);

    useImperativeHandle(ref, () => wrapperRef.current!);

    const onSelect = (value: string) => {
      props.onChange?.(value);
      setOpened(null);
    };

    const close = () => {
      setOpened(null);
    };

    return html`
      <${EdybaraSelectContext.Provider} value=${{
        opened: opened,
        value: props.value,
        onSelect: onSelect,
        close: close,
      }}>
        <${EdybaraButton}
          ref="${wrapperRef}"
          disabled="${props.disabled}"
          className="${classes(
            'edybara-select',
            opened ? 'edybara-active' : '',
            props.disabled ? 'edybara-disabled' : '',
            className,
          )}"
          onclick="${() => {
            setOpened(opened ? null : { target: wrapperRef.current! });
          }}"
        >
          ${children}
          ${
            !props.hideArrow
              ? html`
                  <i
                    className="${classes(
                      'edybara-select-arrow-icon',
                      'ri-arrow-down-s-line',
                    )}"
                  ></i>
                `
              : null
          }
        </${EdybaraButton}>
      </${EdybaraSelectContext.Provider}>
    `;
  },
);

export interface EdybaraSelectTextProps {
  children: ComponentChildren;
}

const EdybaraSelectText = ({ children }: EdybaraSelectTextProps) => {
  return children;
};

export interface EdybaraSelectOptionProps {
  children: ComponentChildren;
  className?: string;
  onClick?: () => void;
  value: string;
}

const EdybaraSelectOption = forwardRef<HTMLLIElement, EdybaraSelectOptionProps>(
  ({ children, value, className, onClick }, ref) => {
    const context = useContext(EdybaraSelectContext);
    return html`
      <${EdybaraListItem} 
        className="${classes(
          'edybara-select-option',
          context.value === value ? 'edybara-active' : '',
          className,
        )}"
        onclick=${() => {
          context.onSelect(value);
          onClick?.();
        }}>
        ${children}
      </${EdybaraListItem}>
    `;
  },
);

export interface EdybaraSelectOptionGroupProps {
  className: string;
  children: ComponentChildren;
  matchWidth: boolean;
}

const EdybaraSelectOptionGroup = forwardRef<
  HTMLDivElement,
  EdybaraSelectOptionGroupProps
>(({ className, children, ...props }) => {
  const context = useContext(EdybaraSelectContext);

  if (context.opened === null) {
    return null;
  }

  const target = context.opened.target;
  const rect = target.getBoundingClientRect();

  return html`
    <${EdybaraOverlay}>
      <${EdybaraLayer}
        target="${context.opened.target}"
        maxHeight="${300}"
        width="${props.matchWidth ? rect.width : undefined}"
        outerMousedown="${() => context.close()}">
        <${EdybaraUnorderedList} className="${classes(className)}">
          ${children}
        </${EdybaraUnorderedList}>
      </${EdybaraLayer}>
    </${EdybaraOverlay}>
  `;
});

export const EdybaraSelect = {
  Root: EdybaraSelectRoot,
  Text: EdybaraSelectText,
  OptionGroup: EdybaraSelectOptionGroup,
  Option: EdybaraSelectOption,
} as const;
