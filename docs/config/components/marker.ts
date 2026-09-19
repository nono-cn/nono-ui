import type { ComponentDocConfig } from '../component-docs'
import MarkerPlaygroundExample from '../../components/examples/marker/MarkerPlaygroundExample.vue'

const markerConfig: ComponentDocConfig = {
  slug: 'marker',
  title: 'Marker',
  description: 'Indicador de estado para mostrar información breve sobre una operación o proceso.',
  importPath: '@nono-cn/nono-ui/components/ui/Marker',
  playground: MarkerPlaygroundExample,
  usage: [],
  examples: [],
  accessibility: [
    {
      title: 'Mensajes de estado',
      description:
        'Usa status=true solo para actualizaciones de estado que deban exponerse como role="status" y conserva un texto visible que explique el cambio. El componente reenvía los atributos HTML, class, style, data-* y ARIA al elemento raíz. Los iconos configurados se marcan como decorativos con aria-hidden="true", por lo que no deben ser la única fuente de información.',
    },
  ],
  api: {
    props: [
      {
        name: 'variant',
        type: "'default' | 'border' | 'separator'",
        default: "'default'",
        description: 'Tratamiento visual del indicador.',
      },
      {
        name: 'icon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description: 'Configuración del icono mostrado antes del contenido.',
      },
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Texto mostrado cuando no se proporciona contenido en el slot default.',
      },
      {
        name: 'status',
        type: 'boolean',
        default: 'false',
        description: 'Cuando es true, establece role="status" en el elemento raíz.',
      },
      {
        name: 'shimmer',
        type: 'boolean',
        default: 'false',
        description: 'Aplica la animación de pulso al elemento raíz.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Contenido principal del indicador; sustituye el fallback de label.',
      },
      {
        name: 'icon',
        type: '-',
        description:
          'Contenido mostrado antes del contenido principal; sustituye el fallback de icon.',
      },
    ],
    expose: [],
  },
}

export default markerConfig
