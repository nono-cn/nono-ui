import type { ComponentDocConfig } from '../component-docs'
import EmptyPlaygroundExample from '../../components/examples/empty/EmptyPlaygroundExample.vue'

const emptyConfig: ComponentDocConfig = {
  slug: 'empty',
  title: 'Empty',
  description: 'Estado visual para representar que una sección no contiene datos o resultados.',
  importPath: '@nono-cn/nono-ui/components/ui/Empty',
  playground: EmptyPlaygroundExample,
  usage: [],
  examples: [],
  accessibility: [
    {
      title: 'Mensaje de estado',
      description:
        'Proporciona un label y una descripción claros. Las acciones del contenido deben tener nombres accesibles y el mensaje no debe depender únicamente de un icono o del color.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Título del estado vacío.',
      },
      {
        name: 'description',
        type: 'string',
        default: 'undefined',
        description: 'Texto complementario del estado vacío.',
      },
      {
        name: 'mediaVariant',
        type: "'default' | 'icon'",
        default: "'default'",
        description: 'Tratamiento visual del slot media.',
      },
      {
        name: 'ui',
        type: `{
  header?: () => HTMLAttributes
  media?: () => HTMLAttributes
  label?: () => HTMLAttributes
  description?: () => HTMLAttributes
  content?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description: 'Resolvers para personalizar los atributos de las regiones internas.',
      },
    ],
    emits: [],
    slots: [
      { name: 'default', type: '-', description: 'Contenido principal, como acciones o enlaces.' },
      { name: 'media', type: '-', description: 'Icono, ilustración u otro contenido visual.' },
      { name: 'label', type: '-', description: 'Sustituye el texto del label.' },
      { name: 'description', type: '-', description: 'Sustituye el texto de la description.' },
    ],
    expose: [],
  },
}

export default emptyConfig
