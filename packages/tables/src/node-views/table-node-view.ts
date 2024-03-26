import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { html } from '@edybara/ui';
import { createRef, render } from 'preact';
import { forwardRef, useImperativeHandle, useRef } from 'preact/compat';

/**
 * @public
 */
interface CellAttrs {
  colspan: number;
  rowspan: number;
  colwidth: number[] | null;
}

/**
 * @public
 */
function updateColumnsOnResize(
  node: PMNode,
  colgroup: HTMLTableColElement,
  table: HTMLTableElement,
  cellMinWidth: number,
  overrideCol?: number,
  overrideValue?: number,
): void {
  let totalWidth = 0;
  let fixedWidth = true;
  let nextDOM = colgroup.firstChild as HTMLElement;
  const row = node.firstChild;

  if (!row) {
    return;
  }

  // const cols: {
  //   colspan: number;
  //   colwidth: number[] | null;
  // }[] = [];

  for (let i = 0, col = 0; i < row.childCount; i++) {
    const { colspan, colwidth } = row.child(i).attrs as CellAttrs;
    for (let j = 0; j < colspan; j++, col++) {
      const hasWidth =
        overrideCol == col ? overrideValue : colwidth && colwidth[j];
      const cssWidth = hasWidth ? hasWidth + 'px' : '';
      totalWidth += hasWidth || cellMinWidth;
      if (!hasWidth) {
        fixedWidth = false;
      }
      if (!nextDOM) {
        const colElement = document.createElement('col');
        colElement.style.width = cssWidth;
        colgroup.appendChild(colElement);
      } else {
        if (nextDOM.style.width != cssWidth) {
          nextDOM.style.width = cssWidth;
        }
        nextDOM = nextDOM.nextSibling as HTMLElement;
      }
    }
  }

  while (nextDOM) {
    const after = nextDOM.nextSibling;
    nextDOM.parentNode?.removeChild(nextDOM);
    nextDOM = after as HTMLElement;
  }

  if (fixedWidth) {
    table.style.width = totalWidth + 'px';
    table.style.minWidth = '';
  } else {
    table.style.width = '';
    table.style.minWidth = totalWidth + 'px';
  }
}

export interface EdybaraTableViewRef {
  colgroup: () => HTMLTableColElement;
  table: () => HTMLTableElement;
  tbody: () => HTMLTableSectionElement;
}

export const EdybaraTableView = forwardRef<
  EdybaraTableViewRef,
  HTMLTableSectionElement
>((_, ref) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const colgroupRef = useRef<HTMLTableColElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  useImperativeHandle(ref, () => ({
    colgroup: () => colgroupRef.current!,
    table: () => tableRef.current!,
    tbody: () => tbodyRef.current!,
  }));

  return html`
    <table className="edybara-table" ref=${tableRef}>
      <colgroup className="edybara-colgroup" ref=${colgroupRef}></colgroup>
      <tbody className="edybara-tbody" ref=${tbodyRef}></tbody>
    </table>
  `;
});

export class EdybaraTableNodeView implements NodeView {
  public ref = createRef<EdybaraTableViewRef>();
  public readonly dom = document.createElement('div');

  public get contentDOM() {
    return this.ref.current!.tbody();
  }

  public constructor(
    private node: PMNode,
    private readonly editorView: EditorView,
    private readonly getPos: () => number | undefined,
  ) {
    this.dom.classList.add('edybara-table-container');
    render(
      html`<${EdybaraTableView} ref=${this.ref}></${EdybaraTableView}>`,
      this.dom,
    );
    updateColumnsOnResize(
      node,
      this.ref.current!.colgroup(),
      this.ref.current!.table(),
      100,
    );
  }

  public update(node: PMNode): boolean {
    if (node.type != this.node.type) {
      return false;
    }
    this.node = node;
    render(
      html`<${EdybaraTableView} ref=${this.ref}></${EdybaraTableView}>`,
      this.dom,
    );
    updateColumnsOnResize(
      node,
      this.ref.current!.colgroup(),
      this.ref.current!.table(),
      100,
    );
    return true;
  }

  public destroy() {
    render(null, this.dom);
  }

  public ignoreMutation(record: MutationRecord): boolean {
    return !!(
      record.type == 'attributes' &&
      (record.target == this.ref.current?.table() ||
        this.ref.current?.colgroup().contains(record.target))
    );
  }
}
