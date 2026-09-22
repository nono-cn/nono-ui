import type { ComponentDocConfig } from '../component-docs'
import EmptyDefaultExample from '../../components/examples/empty/EmptyDefaultExample.vue'
import EmptyDescriptionExample from '../../components/examples/empty/EmptyDescriptionExample.vue'
import EmptyLabelExample from '../../components/examples/empty/EmptyLabelExample.vue'
import EmptyMediaVariantExample from '../../components/examples/empty/EmptyMediaVariantExample.vue'
import EmptyUsageExample from '../../components/examples/empty/EmptyUsageExample.vue'

const emptyConfig: ComponentDocConfig = {
  slug: 'empty',
  title: 'Empty',
  description: 'Estado visual para representar que una sección no contiene datos o resultados.',
  importPath: '@nono-ui/components/ui/Empty',
  usage: [
    {
      title: 'Uso básico',
      description: 'Muestra un estado vacío con una acción para continuar.',
      component: EmptyUsageExample,
    },
  ],
  examples: [
    {
      title: 'Default',
      description: 'Añade acciones o enlaces como contenido principal.',
      component: EmptyDefaultExample,
    },
    {
      title: 'Label',
      description: 'Define el título principal del estado vacío.',
      component: EmptyLabelExample,
    },
    {
      title: 'Description',
      description: 'Añade información complementaria al estado vacío.',
      component: EmptyDescriptionExample,
    },
    {
      title: 'MediaVariant',
      description: 'Aplica el tratamiento visual de icono al contenido media.',
      component: EmptyMediaVariantExample,
    },
  ],
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
