import type { ComponentDocConfig } from '../component-docs'
import AspectRatioRatioExample from '../../components/examples/aspect-ratio/AspectRatioRatioExample.vue'
import AspectRatioSlotExample from '../../components/examples/aspect-ratio/AspectRatioSlotExample.vue'
import AspectRatioUsageExample from '../../components/examples/aspect-ratio/AspectRatioUsageExample.vue'

const aspectRatioConfig: ComponentDocConfig = {
  slug: 'aspect-ratio',
  title: 'AspectRatio',
  description: 'Mantiene una proporción constante para imágenes, vídeos y contenido adaptable.',
  importPath: '@nono-cn/nono-ui/components/ui/AspectRatio',
  usage: [
    {
      title: 'Uso básico',
      description:
        'Define una proporción y coloca el contenido que quieras mantener dentro de ella.',
      component: AspectRatioUsageExample,
    },
  ],
  examples: [
    {
      title: 'Ratio',
      description:
        'Cambia la proporción para adaptar el espacio a distintos formatos de contenido.',
      component: AspectRatioRatioExample,
    },
    {
      title: 'Slot',
      description:
        'Compón el contenido del ratio con una imagen, un vídeo o cualquier elemento Vue.',
      component: AspectRatioSlotExample,
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
