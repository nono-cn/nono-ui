import type { ComponentDocConfig } from '../component-docs'
import RibbonBasicExample from '../../components/examples/ribbon/RibbonBasicExample.vue'
import RibbonPositionsExample from '../../components/examples/ribbon/RibbonPositionsExample.vue'
import RibbonStylesExample from '../../components/examples/ribbon/RibbonStylesExample.vue'

const ribbonConfig: ComponentDocConfig = {
  slug: 'ribbon',
  title: 'Ribbon',
  description: 'Añade cintas decorativas superpuestas a una tarjeta o bloque de contenido.',
  importPath: '@nono-cn/nono-ui/components/ui/Ribbon',
  usage: [
    {
      title: 'Ribbon básica',
      description: 'Añade una cinta decorativa al contenido.',
      component: RibbonBasicExample,
    },
  ],
  examples: [
    {
      title: 'Posiciones',
      description: 'Coloca las cintas en cualquiera de las cuatro esquinas.',
      component: RibbonPositionsExample,
    },
    {
      title: 'Severity y color',
      description: 'Usa una severidad o un color CSS personalizado.',
      component: RibbonStylesExample,
    },
  ],
  accessibility: [
    {
      title: 'Contenido decorativo',
      description:
        'Las bandas se renderizan con aria-hidden="true" porque son decorativas. Mantén la información importante también en el contenido del slot default, con texto y acciones que puedan leer y usar las tecnologías de asistencia. No dependas únicamente del color, la posición o la rotación para comunicar un estado.',
    },
  ],
  api: {
    props: [
      {
        name: 'ribbons',
        type: 'RibbonItem[]',
        typeLink: '/components/ribbon#ribbon-item',
        default: '[]',
        description: 'Lista de cintas que se renderizan sobre el contenido.',
      },
    ],
    configs: [
      {
        id: 'ribbon-item',
        title: 'RibbonItem',
        description: 'Configuración de cada objeto dentro de ribbons.',
        showDefault: true,
        rows: [
          {
            name: 'label',
            type: 'string',
            description: 'Texto que muestra la cinta.',
            required: true,
          },
          {
            name: 'severity',
            type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
            default: "'primary'",
            description: 'Tratamiento visual semántico de la cinta.',
          },
          {
            name: 'color',
            type: 'string',
            default: 'undefined',
            description: 'Color CSS personalizado. Tiene prioridad sobre severity.',
          },
          {
            name: 'position',
            type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'",
            default: "'top-right'",
            description: 'Esquina en la que se coloca la cinta.',
          },
          {
            name: 'rotate',
            type: 'number',
            default: 'según position',
            description: 'Ángulo de rotación en grados.',
          },
          {
            name: 'zIndex',
            type: 'number',
            default: '20 + index',
            description: 'Orden de apilado de la cinta respecto a las demás.',
          },
        ],
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Contenido que se renderiza por encima de las cintas.',
      },
    ],
    expose: [],
  },
}

export default ribbonConfig
