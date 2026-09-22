import type { ComponentDocConfig } from '../component-docs'
import AspectRatioBasicExample from '../../components/examples/aspect-ratio/AspectRatioBasicExample.vue'
import AspectRatioVideoExample from '../../components/examples/aspect-ratio/AspectRatioVideoExample.vue'
import AspectRatioRatiosExample from '../../components/examples/aspect-ratio/AspectRatioRatiosExample.vue'

const aspectRatioConfig: ComponentDocConfig = {
  slug: 'aspect-ratio',
  title: 'AspectRatio',
  description: 'Mantiene una proporción constante para imágenes, vídeos y contenido adaptable.',
  importPath: '@nono-cn/nono-ui/components/ui/AspectRatio',
  usage: [
    {
      title: 'Contenido adaptable',
      description: 'Mantén una proporción cuadrada para contenido visual.',
      component: AspectRatioBasicExample,
    },
  ],
  examples: [
    {
      title: 'Formato panorámico',
      description: 'Usa una proporción 16:9 para vídeos y contenido audiovisual.',
      component: AspectRatioVideoExample,
    },
    {
      title: 'Diferentes proporciones',
      description: 'Compara varias proporciones para elegir la más adecuada.',
      component: AspectRatioRatiosExample,
    },
  ],
  accessibility: [
    {
      title: 'Contenido accesible',
      description:
        'AspectRatio solo controla la proporción del contenedor y no añade por sí mismo un nombre o un rol interactivo. Proporciona alt descriptivo a las imágenes informativas, subtítulos y controles accesibles a los vídeos, y un nombre apropiado a cualquier contenido interactivo que coloques dentro del slot default. El ratio debe ser una decisión visual, no la única forma de comunicar información.',
    },
  ],
  api: {
    props: [
      {
        name: 'ratio',
        type: 'number',
        default: '1',
        description: 'Proporción entre el ancho y el alto del contenedor.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Contenido que se renderiza dentro del contenedor con proporción.',
      },
    ],
    expose: [],
  },
}

export default aspectRatioConfig
