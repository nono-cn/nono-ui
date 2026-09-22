import type { ComponentDocConfig } from '../component-docs'
import SearchPlaygroundExample from '../../components/examples/search/SearchPlaygroundExample.vue'

const searchConfig: ComponentDocConfig = {
  slug: 'search',
  title: 'Search',
  description: 'Contenedor semántico para agrupar los controles de una búsqueda.',
  importPath: '@nono-ui/components/ui/Search',
  playground: SearchPlaygroundExample,
  usage: [],
  examples: [],
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
