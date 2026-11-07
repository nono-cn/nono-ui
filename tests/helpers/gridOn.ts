import { h, type VNodeChild } from 'vue'

// Como gridOn de Vuetify (packages/vuetify/test/templates/gridOn.tsx): una rejilla A × B para
// las stories del showcase. Una fila por cada valor de `rows`, titulada con ese valor, con
// `render(row, column)` para cada valor de `columns`. Con `rows = [null]`, una sola fila sin título.
//
// stories: { 'Variante × color': gridOn(badgeVariantNames, themeColors, (variant, color) => …) }
export function gridOn<A, B>(
  rows: readonly A[],
  columns: readonly B[],
  render: (row: A, column: B) => VNodeChild,
) {
  return () =>
    h(
      'div',
      { 'data-showcase-grid': '' },
      rows.map((row) =>
        h('div', { 'data-showcase-grid-row': '' }, [
          row != null && h('h4', String(row)),
          h(
            'div',
            { 'data-showcase-grid-cells': '' },
            // cada celda lleva su nombre para que el showcase diga cuál ha cambiado
            columns.map((column) =>
              h(
                'div',
                {
                  'data-showcase-part': row != null ? `${row} / ${column}` : String(column),
                },
                [render(row, column)],
              ),
            ),
          ),
        ]),
      ),
    )
}
