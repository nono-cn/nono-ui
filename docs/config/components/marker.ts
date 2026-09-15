import type { ComponentDocConfig } from '../component-docs'
import MarkerIconExample from '../../components/examples/marker/MarkerIconExample.vue'
import MarkerShimmerExample from '../../components/examples/marker/MarkerShimmerExample.vue'
import MarkerStatusExample from '../../components/examples/marker/MarkerStatusExample.vue'
import MarkerUsageExample from '../../components/examples/marker/MarkerUsageExample.vue'
import MarkerVariantExample from '../../components/examples/marker/MarkerVariantExample.vue'

const markerConfig: ComponentDocConfig = {
  slug: 'marker',
  title: 'Marker',
  description: 'Indicador de estado para mostrar información breve sobre una operación o proceso.',
  importPath: '@nono-cn/nono-ui/components/ui/Marker',
  usage: [
    {
      title: 'Uso básico',
      description: 'Muestra un mensaje de estado con el contenido de label.',
      component: MarkerUsageExample,
    },
  ],
  examples: [
    {
      title: 'Variant',
      description:
        'Elige entre un indicador simple, con borde inferior o con separadores laterales.',
      component: MarkerVariantExample,
    },
    {
      title: 'Icon',
      description: 'Añade un icono mediante IconConfig o elimina el icono.',
      component: MarkerIconExample,
    },
    {
      title: 'Status',
      description:
        'Expone el indicador con role=status para comunicar una actualización no urgente.',
      component: MarkerStatusExample,
    },
    {
      title: 'Shimmer',
      description: 'Aplica una animación de pulso mientras el proceso está en curso.',
      component: MarkerShimmerExample,
    },
  ],
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
