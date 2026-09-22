import type { ComponentDocConfig } from '../component-docs'
import PopoverBasicExample from '../../components/examples/popover/PopoverBasicExample.vue'
import PopoverContentExample from '../../components/examples/popover/PopoverContentExample.vue'
import PopoverArrowExample from '../../components/examples/popover/PopoverArrowExample.vue'
import PopoverControlledExample from '../../components/examples/popover/PopoverControlledExample.vue'

const popoverConfig: ComponentDocConfig = {
  slug: 'popover',
  title: 'Popover',
  description: 'Muestra contenido contextual relacionado con un elemento disparador.',
  importPath: '@nono-cn/nono-ui/components/ui/Popover',
  usage: [
    {
      title: 'Popover básico',
      description: 'Abre contenido contextual desde un botón disparador.',
      component: PopoverBasicExample,
    },
  ],
  examples: [
    {
      title: 'Content',
      description: 'Configura la posición, offsets y colisiones del contenido.',
      component: PopoverContentExample,
    },
    {
      title: 'Arrow',
      description: 'Personaliza el tamaño y la forma de la flecha.',
      component: PopoverArrowExample,
    },
    {
      title: 'Estado controlado',
      description: 'Controla el estado abierto desde el componente padre.',
      component: PopoverControlledExample,
    },
  ],
  accessibility: [
    {
      title: 'Disparadores y teclado',
      description:
        'Usa un elemento interactivo con nombre accesible como disparador. El contenido gestiona el foco y puede cerrarse con Escape.',
      links: [
        {
          label: 'Consulta la guía de accesibilidad de Popover en Reka UI',
          href: 'https://www.reka-ui.com/docs/components/popover#accessibility',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'open',
        type: 'boolean',
        default: 'false',
        description: 'Controla si el popover está abierto. Se usa con v-model:open.',
      },
      {
        name: 'modal',
        type: 'boolean',
        default: 'false',
        description: 'Desactiva la interacción con el contenido exterior mientras está abierto.',
      },
      {
        name: 'showArrow',
        type: 'boolean',
        default: 'false',
        description: 'Muestra la flecha configurada mediante arrow.',
      },
      {
        name: 'content',
        type: 'PopoverContentConfig',
        default: 'undefined',
        description:
          'Configuración agrupada de las props, callbacks y atributos de PopoverContent.',
      },
      {
        name: 'arrow',
        type: 'PopoverArrowConfig',
        default: 'undefined',
        description: 'Configuración agrupada de las props y atributos de PopoverArrow.',
      },
    ],
    configs: [
      {
        id: 'popover-context',
        title: 'PopoverContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Contexto compartido que reciben los slots default y content.',
        rows: [
          { name: 'open', type: 'boolean', description: 'Indica si el popover está abierto.' },
          {
            name: 'close',
            type: '() => void',
            description: 'Cierra el popover de forma programática.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'update:open',
        type: '[value: boolean]',
        description: 'Se emite cuando cambia el estado abierto.',
      },
      { name: 'show', type: '[]', description: 'Se emite al abrir el popover.' },
      { name: 'close', type: '[]', description: 'Se emite al cerrar el popover.' },
    ],
    slots: [
      {
        name: 'default',
        type: 'PopoverContext',
        typeLink: '#popover-context',
        description: 'Disparador. Recibe open y close.',
      },
      {
        name: 'content',
        type: 'PopoverContext',
        typeLink: '#popover-context',
        description: 'Contenido contextual. Recibe open y close.',
      },
    ],
    expose: [],
  },
}

export default popoverConfig
