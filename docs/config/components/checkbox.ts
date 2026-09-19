import type { ComponentDocConfig } from '../component-docs'
import CheckboxUsageExample from '../../components/examples/checkbox/CheckboxUsageExample.vue'
import CheckboxValuesExample from '../../components/examples/checkbox/CheckboxValuesExample.vue'
import CheckboxStatesExample from '../../components/examples/checkbox/CheckboxStatesExample.vue'
import CheckboxIconExample from '../../components/examples/checkbox/CheckboxIconExample.vue'

const checkboxConfig: ComponentDocConfig = {
  slug: 'checkbox',
  title: 'Checkbox',
  description: 'Control accesible para seleccionar una opción o representar una selección parcial.',
  importPath: '@nono-cn/nono-ui/components/ui/Checkbox',
  usage: [
    {
      title: 'Uso básico',
      description: 'Controla un valor booleano con v-model:value.',
      component: CheckboxUsageExample,
    },
  ],
  examples: [
    {
      title: 'Valores personalizados',
      description: 'Usa trueValue y falseValue para representar estados con valores propios.',
      component: CheckboxValuesExample,
    },
    {
      title: 'Estado indeterminado',
      description: 'Representa una selección parcial con el valor indeterminate.',
      component: CheckboxStatesExample,
    },
    {
      title: 'Icon',
      description: 'Personaliza el icono del indicador mediante IconConfig.',
      component: CheckboxIconExample,
    },
  ],
  accessibility: [
    {
      title: 'Nombre accesible',
      description:
        'Asocia el checkbox con una etiqueta visible o proporciona aria-label cuando no haya texto. Los atributos HTML y ARIA se reenvían al botón raíz.',
    },
  ],
  api: {
    props: [
      {
        name: 'value',
        type: "boolean | number | string | 'indeterminate'",
        default: 'false',
        description: 'Valor actual; se actualiza mediante v-model:value.',
      },
      {
        name: 'trueValue',
        type: 'boolean | number | string',
        default: 'true',
        description: 'Valor que representa el estado seleccionado.',
      },
      {
        name: 'falseValue',
        type: 'boolean | number | string',
        default: 'false',
        description: 'Valor que representa el estado no seleccionado.',
      },
      {
        name: 'icon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: "{ name: 'check' }",
        description: 'Configuración del icono mostrado dentro del indicador.',
      },
      {
        name: 'ui',
        type: '{ indicator?: (context: CheckboxContext) => HTMLAttributes }',
        typeParts: [
          { text: '{ indicator?: (context: ' },
          { text: 'CheckboxContext', link: '/components/checkbox#checkbox-context' },
          { text: ') => HTMLAttributes }' },
        ],
        typePre: true,
        default: 'undefined',
        description: 'Resolver para personalizar los atributos y clases del indicador.',
      },
    ],
    emits: [
      {
        name: 'update:value',
        type: "[value: boolean | number | string | 'indeterminate']",
        description: 'Se emite cuando cambia el valor.',
      },
    ],
    slots: [],
    configs: [
      {
        id: 'checkbox-context',
        title: 'CheckboxContext',
        showDefault: false,
        rows: [
          {
            name: 'state',
            type: "boolean | 'indeterminate'",
            description: 'Estado actual del checkbox.',
          },
        ],
      },
    ],
    expose: [],
  },
}

export default checkboxConfig
