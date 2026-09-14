import type { ComponentDocConfig } from '../component-docs'
import RibbonColorExample from '../../components/examples/ribbon/RibbonColorExample.vue'
import RibbonMultipleExample from '../../components/examples/ribbon/RibbonMultipleExample.vue'
import RibbonPositionExample from '../../components/examples/ribbon/RibbonPositionExample.vue'
import RibbonRotationExample from '../../components/examples/ribbon/RibbonRotationExample.vue'
import RibbonSeverityExample from '../../components/examples/ribbon/RibbonSeverityExample.vue'
import RibbonUsageExample from '../../components/examples/ribbon/RibbonUsageExample.vue'

const ribbonConfig: ComponentDocConfig = {
  slug: 'ribbon',
  title: 'Ribbon',
  description: 'Añade cintas decorativas superpuestas a una tarjeta o bloque de contenido.',
  importPath: '@nono-cn/nono-ui/components/ui/Ribbon',
  usage: [
    {
      title: 'Uso básico',
      description:
        'Pasa una etiqueta en ribbons y coloca el contenido que quieras decorar en el slot default.',
      component: RibbonUsageExample,
    },
  ],
  examples: [
    {
      title: 'Position',
      description: 'Coloca la cinta en cualquiera de las cuatro esquinas del contenedor.',
      component: RibbonPositionExample,
    },
    {
      title: 'Severity',
      description: 'Usa una severidad para aplicar uno de los tratamientos visuales disponibles.',
      component: RibbonSeverityExample,
    },
    {
      title: 'Color',
      description: 'Sobrescribe la severidad con un color CSS personalizado.',
      component: RibbonColorExample,
    },
    {
      title: 'Rotate & zIndex',
      description: 'Ajusta manualmente la rotación y el orden de apilado de una cinta.',
      component: RibbonRotationExample,
    },
    {
      title: 'Multiple ribbons',
      description: 'Renderiza varias cintas con una sola instancia de Ribbon.',
      component: RibbonMultipleExample,
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
