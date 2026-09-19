import type { ComponentDocConfig } from '../component-docs'
import TextareaUsageExample from '../../components/examples/textarea/TextareaUsageExample.vue'
import TextareaControlledExample from '../../components/examples/textarea/TextareaControlledExample.vue'
import TextareaAutoresizeExample from '../../components/examples/textarea/TextareaAutoresizeExample.vue'

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
