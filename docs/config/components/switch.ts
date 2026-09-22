import type { ComponentDocConfig } from '../component-docs'
import SwitchBasicExample from '../../components/examples/switch/SwitchBasicExample.vue'
import SwitchValuesExample from '../../components/examples/switch/SwitchValuesExample.vue'
import SwitchSizesExample from '../../components/examples/switch/SwitchSizesExample.vue'
import SwitchSeverityExample from '../../components/examples/switch/SwitchSeverityExample.vue'
import SwitchColorExample from '../../components/examples/switch/SwitchColorExample.vue'
import SwitchIconsExample from '../../components/examples/switch/SwitchIconsExample.vue'

const switchConfig: ComponentDocConfig = {
  slug: 'switch',
  title: 'Switch',
  description: 'Control interactivo para activar o desactivar una opción.',
  importPath: '@nono-ui/components/ui/Switch',
  usage: [
    {
      title: 'Uso básico',
      description: 'Asocia el control a un texto y enlaza su estado con v-model:value.',
      component: SwitchBasicExample,
    },
  ],
  examples: [
    {
      title: 'Valores personalizados',
      description: 'Configura trueValue y falseValue para usar valores distintos de booleanos.',
      component: SwitchValuesExample,
    },
    {
      title: 'Tamaños',
      description: 'Compara los cinco tamaños disponibles.',
      component: SwitchSizesExample,
    },
    {
      title: 'Severidad',
      description: 'Elige un color semántico para el estado activado.',
      component: SwitchSeverityExample,
    },
    {
      title: 'Color personalizado',
      description: 'Usa color para aplicar un color CSS propio con prioridad sobre severity.',
      component: SwitchColorExample,
    },
    {
      title: 'Iconos',
      description: 'Muestra iconos distintos en el thumb según el estado.',
      component: SwitchIconsExample,
    },
  ],
  accessibility: [
    {
      title: 'Nombre accesible',
      description:
        'Proporciona un label visible asociado o un aria-label cuando el switch no tenga texto. Los atributos HTML y ARIA se reenvían al botón raíz.',
    },
  ],
  api: {
    props: [
      {
        name: 'value',
        type: 'boolean | number | string',
        default: 'false',
        description: 'Valor actual; se actualiza mediante v-model:value.',
      },
      {
        name: 'trueValue',
        type: 'boolean | number | string',
        default: 'true',
        description: 'Valor que representa el estado activado.',
      },
      {
        name: 'falseValue',
        type: 'boolean | number | string',
        default: 'false',
        description: 'Valor que representa el estado desactivado.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Tamaño visual del switch y de su thumb.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
        default: "'primary'",
        description: 'Color semántico del estado activado.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Color CSS personalizado. Tiene prioridad sobre severity.',
      },
      {
        name: 'uncheckedIcon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description: 'Icono mostrado dentro del thumb cuando el switch está desactivado.',
      },
      {
        name: 'checkedIcon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description: 'Icono mostrado dentro del thumb cuando el switch está activado.',
      },
      {
        name: 'ui',
        type: `{
  thumb?: (context: SwitchContext) => HTMLAttributes
}`,
        typeParts: [
          { text: '{\n  thumb?: (context: ' },
          { text: 'SwitchContext', link: '/components/switch#switch-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        typePre: true,
        default: 'undefined',
        description: 'Resolver para personalizar los atributos y clases del thumb.',
      },
    ],
    emits: [
      {
        name: 'update:value',
        type: '[value: boolean | number | string]',
        description: 'Se emite cuando cambia el valor.',
      },
    ],
    slots: [],
    configs: [
      {
        id: 'switch-context',
        title: 'SwitchContext',
        showDefault: false,
        rows: [
          {
            name: 'state',
            type: 'boolean',
            description: 'Indica si el switch está activado.',
          },
        ],
      },
    ],
    expose: [],
  },
}

export default switchConfig
