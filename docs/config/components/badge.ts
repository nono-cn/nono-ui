import type { ComponentDocConfig } from '../component-docs'
import BadgeColorExample from '../../components/examples/badge/BadgeColorExample.vue'
import BadgeIconsExample from '../../components/examples/badge/BadgeIconsExample.vue'
import BadgeSeverityExample from '../../components/examples/badge/BadgeSeverityExample.vue'
import BadgeSizeExample from '../../components/examples/badge/BadgeSizeExample.vue'
import BadgeUsageExample from '../../components/examples/badge/BadgeUsageExample.vue'
import BadgeVariantExample from '../../components/examples/badge/BadgeVariantExample.vue'

const badgeConfig: ComponentDocConfig = {
  slug: 'badge',
  title: 'Badge',
  description: 'Etiqueta compacta para estados, categorías y metadatos.',
  importPath: '@nono-cn/nono-ui/components/ui/Badge',
  accessibility: [
    {
      title: 'Contenido y semántica',
      description:
        'Usa texto visible para comunicar el estado y añade semántica ARIA solo cuando el contenido lo necesite. No dependas únicamente del color para transmitir el significado del badge.',
    },
  ],
  usage: [
    {
      title: 'Uso básico',
      description: 'Importa Badge y proporciona un label para mostrar un estado o metadato.',
      component: BadgeUsageExample,
    },
  ],
  examples: [
    {
      title: 'Size',
      description: 'Ajusta el tamaño y el espaciado interno del badge.',
      component: BadgeSizeExample,
    },
    {
      title: 'Variant',
      description: 'Elige el tratamiento visual del badge.',
      component: BadgeVariantExample,
    },
    {
      title: 'Severity',
      description: 'Representa la severidad semántica del estado.',
      component: BadgeSeverityExample,
    },
    {
      title: 'Color',
      description: 'Aplica un color CSS personalizado al badge.',
      component: BadgeColorExample,
    },
    {
      title: 'Icons',
      description: 'Configura los iconos inicial y final mediante IconConfig.',
      component: BadgeIconsExample,
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Texto mostrado cuando no se proporciona contenido en el slot default.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Tamaño visual y espaciado interno del badge.',
      },
      {
        name: 'variant',
        type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft'",
        default: "'solid'",
        description: 'Tratamiento visual del badge.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
        default: "'primary'",
        description: 'Severidad semántica usada para elegir el color del badge.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Color CSS personalizado con un color de contraste calculado.',
      },
      {
        name: 'icon',
        type: 'IconName | IconConfig',
        typeParts: [
          { text: 'IconName' },
          { text: ' | ' },
          { text: 'IconConfig', link: '/components/icon#icon-config' },
        ],
        default: 'undefined',
        description:
          'Nombre del icono o configuración completa mostrada al inicio cuando no se proporciona el slot leading.',
      },
      {
        name: 'trailingIcon',
        type: 'IconName | IconConfig',
        typeParts: [
          { text: 'IconName' },
          { text: ' | ' },
          { text: 'IconConfig', link: '/components/icon#icon-config' },
        ],
        default: 'undefined',
        description:
          'Nombre del icono o configuración completa mostrada al final cuando no se proporciona el slot trailing.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Contenido principal del badge; sustituye el fallback de label.',
      },
      {
        name: 'leading',
        type: '-',
        description: 'Contenido mostrado al inicio; sustituye el fallback de icon.',
      },
      {
        name: 'trailing',
        type: '-',
        description: 'Contenido mostrado al final; sustituye el fallback de trailingIcon.',
      },
    ],
    expose: [],
  },
}

export default badgeConfig
