/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BLOCK_CONTAINER_GROUP,
  BLOCK_CONTAINER_IGNORE_CHILDREN,
} from '@edybara/core';
import { AttributeSpec, Attrs, Node, NodeSpec } from '@edybara/pm/model';
import { MutableAttrs, TableRole } from '@edybara/pm/tables';

export interface TableNodeSpec extends NodeSpec {
  tableRole: TableRole;
}

export interface CellAttributes {
  colspan: number;
  rowspan: number;
  colwidth: number[];
  background: string | null;
}

interface CellAttrs {
  colspan: number;
  rowspan: number;
  colwidth: number[] | null;
}

function getCellAttrs(dom: HTMLElement | string, extraAttrs: Attrs): Attrs {
  if (typeof dom === 'string') {
    return {};
  }

  const widthAttr = dom.getAttribute('data-colwidth');
  const widths =
    widthAttr && /^\d+(,\d+)*$/.test(widthAttr)
      ? widthAttr.split(',').map((s) => Number(s))
      : null;
  const colspan = Number(dom.getAttribute('colspan') || 1);
  const result: MutableAttrs = {
    colspan,
    rowspan: Number(dom.getAttribute('rowspan') || 1),
    colwidth: widths && widths.length == colspan ? widths : null,
  } satisfies CellAttrs;
  for (const prop in extraAttrs) {
    const getter = extraAttrs[prop].getFromDOM;
    const value = getter && getter(dom);
    if (value != null) {
      result[prop] = value;
    }
  }
  return result;
}

function setCellAttrs(node: Node, extraAttrs: Attrs): Attrs {
  const attrs: MutableAttrs = {};
  if (node.attrs['colspan'] != 1) {
    attrs['colspan'] = node.attrs['colspan'];
  }
  if (node.attrs['rowspan'] != 1) {
    attrs['rowspan'] = node.attrs['rowspan'];
  }
  if (node.attrs['colwidth']) {
    attrs['data-colwidth'] = node.attrs['colwidth'].join(',');
  }
  for (const prop in extraAttrs) {
    const setter = extraAttrs[prop].setDOMAttr;
    if (setter) {
      setter(node.attrs[prop], attrs);
    }
  }
  return attrs;
}

const extraAttrs: any = {};
const cellAttrs: Record<string, AttributeSpec> = {
  colspan: { default: 1 },
  rowspan: { default: 1 },
  colwidth: { default: null },
};
for (const prop in extraAttrs) {
  cellAttrs[prop] = { default: extraAttrs[prop].default };
}

export const edybaraTableNodes = (): Record<string, NodeSpec> => {
  const tableNodeSpec: NodeSpec = {
    content: 'table_row+',
    tableRole: 'table',
    isolating: true,
    group: `block ${BLOCK_CONTAINER_IGNORE_CHILDREN}`,
    parseDOM: [
      {
        tag: 'table',
      },
    ],
    toDOM() {
      return ['table', ['tbody', 0]];
    },
  };

  const tableRowNodeSpec: NodeSpec = {
    content: 'table_cell*',
    tableRole: 'row',
    parseDOM: [
      {
        tag: 'tr',
      },
    ],
    toDOM() {
      return ['tr', 0];
    },
  };

  const tableCellNodeSpec: NodeSpec = {
    content: 'block+',
    group: BLOCK_CONTAINER_GROUP,
    attrs: {
      colspan: {
        default: 1,
      },
      rowspan: {
        default: 1,
      },
      colwidth: {
        default: null,
      },
      background: {
        default: null,
      },
    },
    tableRole: 'cell',
    isolating: true,
    parseDOM: [
      {
        tag: 'td',
        getAttrs: (dom) => getCellAttrs(dom, extraAttrs),
      },
      {
        tag: 'th',
        getAttrs: (dom) => getCellAttrs(dom, extraAttrs),
      },
    ],
    toDOM(node: Node) {
      return ['td', setCellAttrs(node, extraAttrs), 0];
    },
  };

  return {
    table: tableNodeSpec,
    table_row: tableRowNodeSpec,
    table_cell: tableCellNodeSpec,
  };
};
