import type { ComponentDocConfig } from '../component-docs'
import MasonryColumnsExample from '../../components/examples/masonry/MasonryColumnsExample.vue'
import MasonrySequentialExample from '../../components/examples/masonry/MasonrySequentialExample.vue'
import MasonrySpacingExample from '../../components/examples/masonry/MasonrySpacingExample.vue'
import MasonryUsageExample from '../../components/examples/masonry/MasonryUsageExample.vue'

const masonryConfig: ComponentDocConfig = {
  slug: 'masonry',
  title: 'Masonry',
  description:
    'Distribuye elementos de altura variable en columnas optimizando el espacio disponible.',
  importPath: '@nono-cn/nono-ui/components/ui/Masonry',
  usage: [
    {
      title: 'Uso básico',
      description: 'Pasa un array de items y renderiza cada elemento con el slot default scoped.',
      component: MasonryUsageExample,
    },
  ],
  examples: [
    {
      title: 'Columns',
      description: 'Cambia el número de columnas del layout.',
      component: MasonryColumnsExample,
    },
    {
      title: 'Sequential',
      description: 'Compara el reparto por columna más corta con el orden secuencial.',
      component: MasonrySequentialExample,
    },
    {
      title: 'Spacing',
      description: 'Ajusta la separación entre columnas y elementos.',
      component: MasonrySpacingExample,
    },
  ],
  accessibility: [
    {
      title: 'Orden y semántica',
      description:
        'Masonry no añade roles interactivos. Mantén el orden lógico de los items y usa elementos semánticos y nombres accesibles dentro del slot.',
    },
  ],
  api: {
    props: [
      {
        name: 'items',
        type: 'unknown[]',
        default: '-',
        required: true,
        description: 'Elementos que Masonry distribuirá entre las columnas.',
      },
      { name: 'columns', type: 'number', default: '4', description: 'Número de columnas.' },
      {
        name: 'spacing',
        type: 'number | string',
        default: '2',
        description: 'Separación entre columnas y elementos, multiplicada por 0.25rem.',
      },
      {
        name: 'sequential',
        type: 'boolean',
        default: 'false',
        description:
          'Reparte los elementos secuencialmente de izquierda a derecha en lugar de elegir la columna más corta.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '{ item: unknown; index: number }',
        description:
          'Contenido de cada item. Si no se proporciona, se renderiza un div con el valor del item.',
      },
    ],
    expose: [],
  },
}

export default masonryConfig
