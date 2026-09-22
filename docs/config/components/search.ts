import type { ComponentDocConfig } from '../component-docs'
import SearchBasicExample from '../../components/examples/search/SearchBasicExample.vue'
import SearchMultipleRegionsExample from '../../components/examples/search/SearchMultipleRegionsExample.vue'

const searchConfig: ComponentDocConfig = {
  slug: 'search',
  title: 'Search',
  description: 'Contenedor semántico para agrupar los controles de una búsqueda.',
  importPath: '@nono-ui/components/ui/Search',
  usage: [
    {
      title: 'Búsqueda básica',
      description: 'Agrupa un campo y un botón dentro de una región de búsqueda accesible.',
      component: SearchBasicExample,
    },
  ],
  examples: [
    {
      title: 'Varias regiones',
      description: 'Distingue cada formulario de búsqueda con su propio nombre accesible.',
      component: SearchMultipleRegionsExample,
    },
  ],
  accessibility: [
    {
      title: 'Región de búsqueda',
      description:
        'Search renderiza un formulario con role="search". Añade aria-label o aria-labelledby para identificar la búsqueda cuando haya más de una región de búsqueda en la página.',
    },
  ],
  api: {
    props: [],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Controles y contenido del formulario de búsqueda.',
      },
    ],
    expose: [],
  },
}

export default searchConfig
