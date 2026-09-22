import type { ComponentDocConfig } from '../component-docs'
import MessageBasicExample from '../../components/examples/message/MessageBasicExample.vue'
import MessageAlignExample from '../../components/examples/message/MessageAlignExample.vue'
import MessageAvatarExample from '../../components/examples/message/MessageAvatarExample.vue'
import MessageSlotsExample from '../../components/examples/message/MessageSlotsExample.vue'
import MessageBubbleExample from '../../components/examples/message/MessageBubbleExample.vue'

const messageConfig: ComponentDocConfig = {
  slug: 'message',
  title: 'Message',
  description: 'Compone un mensaje de conversación con burbuja, avatar, metadatos y reacciones.',
  importPath: '@nono-cn/nono-ui/components/ui/Message',
  usage: [
    {
      title: 'Mensaje básico',
      description: 'Muestra un mensaje con el contenido y el estilo predeterminados.',
      component: MessageBasicExample,
    },
  ],
  examples: [
    {
      title: 'Align',
      description: 'Alinea el mensaje al inicio o al final del contenedor.',
      component: MessageAlignExample,
    },
    {
      title: 'Avatar',
      description: 'Añade un avatar para identificar al interlocutor.',
      component: MessageAvatarExample,
    },
    {
      title: 'Bubble',
      description: 'Personaliza la variante y la severidad de la burbuja interna.',
      component: MessageBubbleExample,
    },
    {
      title: 'Con slots',
      description: 'Personaliza el encabezado, las reacciones y el pie del mensaje.',
      component: MessageSlotsExample,
    },
  ],
  accessibility: [
    {
      title: 'Contenido conversacional',
      description:
        'Message renderiza un div y no añade un role conversacional por sí mismo. Usa texto claro para identificar el contenido y no dependas solo de la alineación, el color o el avatar para indicar quién envía el mensaje. Si el avatar identifica a una persona, proporciona un nombre accesible mediante el slot avatar y atributos como aria-label o alt en el contenido correspondiente. Los atributos HTML, class, style, data-* y ARIA se reenvían al elemento raíz.',
    },
  ],
  api: {
    props: [
      {
        name: 'align',
        type: "'start' | 'end'",
        default: "'start'",
        description: 'Alineación del mensaje y de la burbuja dentro de su contenedor.',
      },
      {
        name: 'avatar',
        type: 'AvatarConfig',
        typeLink: '/components/avatar#avatar-config',
        default: 'undefined',
        description:
          'Configuración del avatar mostrado junto al mensaje cuando no se usa el slot avatar.',
      },
      {
        name: 'bubble',
        type: 'BubbleConfig',
        typeLink: '/components/bubble#bubble-config',
        default: 'undefined',
        description:
          'Configuración de Bubble. La prop align de Message se aplica también a Bubble y prevalece sobre bubble.align.',
      },
      {
        name: 'message',
        type: 'string',
        default: 'undefined',
        description: 'Texto mostrado cuando no se proporciona contenido en el slot default.',
      },
      {
        name: 'ui',
        type: `{
  header?: () => HTMLAttributes
  footer?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers para personalizar los atributos de los contenedores de los slots header y footer.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'avatar',
        type: '-',
        description: 'Contenido mostrado junto al mensaje; sustituye el fallback de avatar.',
      },
      {
        name: 'header',
        type: '-',
        description: 'Contenido mostrado encima de Bubble, como el autor o la hora.',
      },
      {
        name: 'default',
        type: '-',
        description: 'Contenido principal reenviado al slot default de Bubble.',
      },
      {
        name: 'reaction',
        type: '-',
        description: 'Contenido reenviado al slot reactions de Bubble.',
      },
      {
        name: 'footer',
        type: '-',
        description: 'Contenido mostrado debajo de Bubble, como el estado de lectura.',
      },
    ],
    expose: [],
  },
}

export default messageConfig
