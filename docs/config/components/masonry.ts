import type { ComponentDocConfig } from '../component-docs'
import MasonryBasicExample from '../../components/examples/masonry/MasonryBasicExample.vue'
import MasonryResponsiveExample from '../../components/examples/masonry/MasonryResponsiveExample.vue'
import MasonrySequentialExample from '../../components/examples/masonry/MasonrySequentialExample.vue'

const masonryConfig: ComponentDocConfig = {
  slug: 'masonry',
  title: 'Masonry',
  description:
    'Distribuye elementos de altura variable en columnas optimizando el espacio disponible.',
  importPath: '@nono-ui/components/ui/Masonry',
  usage: [
    {
      title: 'Masonry básico',
      description: 'Distribuye elementos de altura variable en tres columnas.',
      component: MasonryBasicExample,
    },
  ],
  examples: [
    {
      title: 'Columnas responsive',
      description: 'Adapta el número de columnas según el ancho de la ventana.',
      component: MasonryResponsiveExample,
    },
    {
      title: 'Orden secuencial',
      description: 'Reparte los elementos de izquierda a derecha en orden estricto.',
      component: MasonrySequentialExample,
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
      {
        name: 'columns',
        type: 'number | { sm?: number; md?: number; lg?: number }',
        default: '4',
        description: 'Número de columnas o configuración responsive para sm, md y lg.',
      },
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
