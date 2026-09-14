import type { ComponentDocConfig } from '../component-docs'
import ChipUsageExample from '../../components/examples/chip/ChipUsageExample.vue'
import ChipSizeExample from '../../components/examples/chip/ChipSizeExample.vue'
import ChipPositionExample from '../../components/examples/chip/ChipPositionExample.vue'
import ChipColorExample from '../../components/examples/chip/ChipColorExample.vue'
import ChipInsetExample from '../../components/examples/chip/ChipInsetExample.vue'
import ChipStandaloneExample from '../../components/examples/chip/ChipStandaloneExample.vue'

const chipConfig: ComponentDocConfig = {
  slug: 'chip',
  title: 'Chip',
  description: 'Indicador compacto que puede mostrarse sobre un elemento o de forma independiente.',
  importPath: '@nono-cn/nono-ui/components/ui/Chip',
  usage: [
    {
      title: 'Uso básico',
      description: 'Muestra un chip sobre un elemento.',
      component: ChipUsageExample,
    },
  ],
  examples: [
    { title: 'Size', description: 'Ajusta el tamaño del indicador.', component: ChipSizeExample },
    {
      title: 'Position',
      description: 'Coloca el chip en una de las esquinas.',
      component: ChipPositionExample,
    },
    {
      title: 'Color',
      description: 'Aplica un color CSS personalizado.',
      component: ChipColorExample,
    },
    {
      title: 'Inset',
      description: 'Evita el desplazamiento del chip respecto a su posición.',
      component: ChipInsetExample,
    },
    {
      title: 'Standalone',
      description: 'Muestra el chip sin posicionamiento absoluto.',
      component: ChipStandaloneExample,
    },
  ],
  accessibility: [
    {
      title: 'Información visual',
      description:
        'No dependas únicamente del color o del tamaño para comunicar información importante. Añade contenido accesible en el elemento asociado cuando el chip transmita un estado.',
    },
  ],
  api: {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Color CSS personalizado del chip.',
      },
      {
        name: 'size',
        type: "'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'",
        default: "'3xl'",
        description: 'Tamaño del indicador.',
      },
      {
        name: 'position',
        type: "'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'",
        default: "'top-right'",
        description: 'Posición del chip cuando no se muestra sobre un slot default.',
      },
      {
        name: 'show',
        type: 'boolean',
        default: 'true',
        description: 'Controla si se muestra el indicador. Se usa con v-model:show.',
      },
      {
        name: 'inset',
        type: 'boolean',
        default: 'false',
        description: 'Evita el desplazamiento del chip respecto a su posición.',
      },
      {
        name: 'standalone',
        type: 'boolean',
        default: 'false',
        description: 'Muestra el chip sin posicionamiento absoluto.',
      },
    ],
    emits: [
      {
        name: 'update:show',
        type: '[value: boolean]',
        description: 'Se emite cuando cambia el estado visible del chip.',
      },
    ],
    slots: [
      { name: 'default', type: '-', description: 'Elemento sobre el que se posiciona el chip.' },
    ],
    expose: [],
  },
}

export default chipConfig
