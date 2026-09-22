import type { ComponentDocConfig } from '../component-docs'
import TextareaPlaygroundExample from '../../components/examples/textarea/TextareaPlaygroundExample.vue'

const textareaConfig: ComponentDocConfig = {
  slug: 'textarea',
  title: 'Textarea',
  description: 'Campo de texto multilínea para introducir contenido largo.',
  importPath: '@nono-ui/components/ui/Textarea',
  playground: TextareaPlaygroundExample,
  usage: [],
  examples: [],
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
