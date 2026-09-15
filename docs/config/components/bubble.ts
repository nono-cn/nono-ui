import type { ComponentDocConfig } from '../component-docs'
import BubbleUsageExample from '../../components/examples/bubble/BubbleUsageExample.vue'
import BubbleAlignExample from '../../components/examples/bubble/BubbleAlignExample.vue'
import BubbleVariantExample from '../../components/examples/bubble/BubbleVariantExample.vue'
import BubbleSeverityExample from '../../components/examples/bubble/BubbleSeverityExample.vue'
import BubbleColorExample from '../../components/examples/bubble/BubbleColorExample.vue'
import BubbleReactionsExample from '../../components/examples/bubble/BubbleReactionsExample.vue'

const bubbleConfig: ComponentDocConfig = {
  slug: 'bubble',
  title: 'Bubble',
  description:
    'Representa mensajes o intervenciones en una conversación con alineación, variantes y reacciones.',
  importPath: '@nono-cn/nono-ui/components/ui/Bubble',
  usage: [
    {
      title: 'Uso básico',
      description: 'Alinea una burbuja de mensaje dentro de una conversación.',
      component: BubbleUsageExample,
    },
  ],
  examples: [
    {
      title: 'Align',
      description: 'Alinea las burbujas al inicio o al final de la conversación.',
      component: BubbleAlignExample,
    },
    {
      title: 'Variant',
      description: 'Elige el tratamiento visual de la superficie.',
      component: BubbleVariantExample,
    },
    {
      title: 'Severity',
      description: 'Representa la severidad semántica del mensaje.',
      component: BubbleSeverityExample,
    },
    {
      title: 'Color',
      description: 'Aplica un color CSS personalizado a la burbuja.',
      component: BubbleColorExample,
    },
    {
      title: 'Reactions',
      description: 'Añade reacciones arriba o abajo de la burbuja.',
      component: BubbleReactionsExample,
    },
  ],
  accessibility: [
    {
      title: 'Contenido conversacional',
      description:
        'Usa texto claro y no dependas solo del color o la alineación para identificar quién envía el mensaje. Las reacciones deben tener nombres accesibles cuando sean interactivas.',
    },
  ],
  api: {
    props: [
      {
        name: 'align',
        type: "'start' | 'end'",
        default: "'start'",
        description: 'Alineación de la burbuja dentro de su contenedor.',
      },
      {
        name: 'variant',
        type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft' | 'muted'",
        default: "'solid'",
        description: 'Tratamiento visual de la superficie.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
        default: "'primary'",
        description: 'Severidad usada para elegir los colores.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Color CSS personalizado.',
      },
      {
        name: 'sideReaction',
        type: "'top' | 'bottom'",
        default: "'bottom'",
        description: 'Lado donde aparecen las reacciones.',
      },
      {
        name: 'alignReaction',
        type: "'start' | 'end'",
        default: "'end'",
        description: 'Alineación de las reacciones.',
      },
      {
        name: 'as',
        type: 'AsTag | Component',
        default: "'div'",
        description: 'Elemento o componente raíz de la superficie.',
      },
      {
        name: 'asChild',
        type: 'boolean',
        default: 'false',
        description: 'Compone la superficie sobre el elemento del slot default.',
      },
      {
        name: 'ui',
        type: `{
  root?: () => HTMLAttributes
  reactions?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description: 'Resolvers para personalizar la superficie y las reacciones.',
      },
    ],
    configs: [
      {
        id: 'bubble-config',
        title: 'BubbleConfig',
        description: 'Alias de BubbleProps para configurar burbujas en componentes compuestos.',
        showDefault: false,
        rows: [
          {
            name: 'BubbleProps',
            type: 'BubbleProps',
            typeLink: '#props',
            description: 'Incluye las props públicas de Bubble.',
          },
        ],
      },
    ],
    emits: [],
    slots: [
      { name: 'default', type: '-', description: 'Contenido principal de la burbuja.' },
      {
        name: 'reactions',
        type: '-',
        description: 'Reacciones que se muestran alrededor de la burbuja.',
      },
    ],
    expose: [],
  },
}

export default bubbleConfig
