import type { ComponentDocConfig } from '../component-docs'
import SwitchUsageExample from '../../components/examples/switch/SwitchUsageExample.vue'
import SwitchValuesExample from '../../components/examples/switch/SwitchValuesExample.vue'
import SwitchThumbExample from '../../components/examples/switch/SwitchThumbExample.vue'
import SwitchSizeExample from '../../components/examples/switch/SwitchSizeExample.vue'

const switchConfig: ComponentDocConfig = {
  slug: 'switch',
  title: 'Switch',
  description: 'Control interactivo para activar o desactivar una opción.',
  importPath: '@nono-cn/nono-ui/components/ui/Switch',
  usage: [
    {
      title: 'Uso básico',
      description: 'Controla un valor booleano con v-model:value.',
      component: SwitchUsageExample,
    },
  ],
  examples: [
    {
      title: 'Size',
      description: 'Ajusta el tamaño del switch y su thumb.',
      component: SwitchSizeExample,
    },
    {
      title: 'Valores personalizados',
      description: 'Usa trueValue y falseValue para valores no booleanos.',
      component: SwitchValuesExample,
    },
    {
      title: 'Thumb personalizado',
      description: 'Personaliza el contenido del thumb con su estado actual.',
      component: SwitchThumbExample,
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
    slots: [
      {
        name: 'thumb',
        type: 'SwitchContext',
        typeLink: '/components/switch#switch-context',
        description: 'Contenido del thumb; recibe state.',
      },
    ],
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
