import type { ComponentDocConfig } from '../component-docs'
import TextareaUsageExample from '../../components/examples/textarea/TextareaUsageExample.vue'
import TextareaControlledExample from '../../components/examples/textarea/TextareaControlledExample.vue'
import TextareaAutoresizeExample from '../../components/examples/textarea/TextareaAutoresizeExample.vue'
import TextareaSizeExample from '../../components/examples/textarea/TextareaSizeExample.vue'
import TextareaSeverityExample from '../../components/examples/textarea/TextareaSeverityExample.vue'
import TextareaColorExample from '../../components/examples/textarea/TextareaColorExample.vue'
import TextareaHighlightExample from '../../components/examples/textarea/TextareaHighlightExample.vue'
import TextareaVariantExample from '../../components/examples/textarea/TextareaVariantExample.vue'

const textareaConfig: ComponentDocConfig = {
  slug: 'textarea',
  title: 'Textarea',
  description: 'Campo de texto multilínea para introducir contenido largo.',
  importPath: '@nono-cn/nono-ui/components/ui/Textarea',
  usage: [
    {
      title: 'Uso básico',
      description: 'Muestra un campo de texto multilínea con un valor inicial.',
      component: TextareaUsageExample,
    },
  ],
  examples: [
    {
      title: 'Valor controlado',
      description: 'Sincroniza el contenido mediante v-model:value.',
      component: TextareaControlledExample,
    },
    {
      title: 'Auto-resize',
      description: 'Ajusta la altura del campo al contenido con la prop autoresize.',
      component: TextareaAutoresizeExample,
    },
    {
      title: 'Tamaños',
      description: 'Adapta la escala visual del campo mediante la prop size.',
      component: TextareaSizeExample,
    },
    {
      title: 'Severity',
      description: 'Cambia el color semántico del campo.',
      component: TextareaSeverityExample,
    },
    {
      title: 'Color personalizado',
      description: 'Usa un color propio que sobreescribe severity.',
      component: TextareaColorExample,
    },
    {
      title: 'Highlight',
      description: 'Muestra el borde semántico sin necesidad de foco.',
      component: TextareaHighlightExample,
    },
    {
      title: 'Variantes',
      description: 'Cambia el estilo del borde y del fondo.',
      component: TextareaVariantExample,
    },
  ],
  accessibility: [
    {
      title: 'Etiqueta y descripción',
      description:
        'Asocia una etiqueta visible mediante for e id. Usa aria-describedby para relacionar una ayuda o descripción adicional con el campo.',
    },
  ],
  api: {
    props: [
      {
        name: 'value',
        type: 'string',
        default: "''",
        description: 'Valor del campo. También puede enlazarse con v-model:value.',
      },
      {
        name: 'autoresize',
        type: 'boolean',
        default: 'false',
        description: 'Ajusta automáticamente la altura al contenido cuando es true.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Controla la altura mínima, el espaciado y el tamaño del texto.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'error' | 'warning' | 'success'",
        default: "'primary'",
        description: 'Define el color semántico del foco del campo.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Usa un color personalizado y tiene prioridad sobre severity.',
      },
      {
        name: 'highlight',
        type: 'boolean',
        default: 'false',
        description: 'Muestra el borde con el color de severity o color incluso sin foco.',
      },
      {
        name: 'variant',
        type: "'outline' | 'subtle' | 'soft' | 'plain' | 'none'",
        default: "'outline'",
        description:
          'Define el estilo del borde y del fondo. none también elimina el borde al enfocar.',
      },
    ],
    emits: [
      {
        name: 'update:value',
        type: '[value: string]',
        description: 'Se emite cuando cambia el contenido del campo.',
      },
    ],
    slots: [],
    expose: [],
  },
}

export default textareaConfig
