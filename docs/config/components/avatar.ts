import type { ComponentDocConfig } from '../component-docs'
import AvatarPlaygroundExample from '../../components/examples/avatar/AvatarPlaygroundExample.vue'

const avatarConfig: ComponentDocConfig = {
  slug: 'avatar',
  title: 'Avatar',
  description: 'Muestra una imagen de perfil con contenido alternativo cuando no está disponible.',
  importPath: '@nono-cn/nono-ui/components/ui/Avatar',
  playground: AvatarPlaygroundExample,
  usage: [],
  examples: [],
  accessibility: [
    {
      title: 'Texto alternativo',
      description:
        'Pasa alt como atributo cuando src contiene una imagen informativa. Usa label para ofrecer un fallback textual cuando la imagen no está disponible y evita depender únicamente del color o de las iniciales para comunicar identidad.',
    },
    {
      title: 'Iconos y contenido personalizado',
      description:
        'Marca los iconos decorativos de icon con aria-hidden="true". Si usas el slot fallback, conserva un nombre o contexto accesible cuando el avatar sea relevante para la tarea.',
    },
  ],
  api: {
    props: [
      {
        name: 'src',
        type: 'string',
        default: 'undefined',
        description:
          'URL de la imagen de perfil. Si no se puede mostrar, se renderiza el fallback.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Tamaño visual del avatar.',
      },
      {
        name: 'shape',
        type: "'rounded' | 'square'",
        default: "'rounded'",
        description: 'Forma visual del avatar: circular o cuadrada.',
      },
      {
        name: 'delayMs',
        type: 'number',
        default: 'undefined',
        description: 'Retraso en milisegundos antes de mostrar el contenido alternativo.',
      },
      {
        name: 'icon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description:
          'Configuración del icono mostrado en el fallback cuando no se proporciona el slot fallback.',
      },
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description:
          'Texto mostrado en el fallback cuando no se proporciona icon ni el slot fallback.',
      },
    ],
    configs: [
      {
        id: 'avatar-config',
        title: 'AvatarConfig',
        description: 'Alias de AvatarProps para configurar avatares en componentes compuestos.',
        showDefault: false,
        rows: [
          {
            name: 'AvatarProps',
            type: 'AvatarProps',
            typeLink: '#props',
            description: 'Incluye las props públicas de Avatar.',
          },
        ],
      },
    ],
    emits: [],
    slots: [
      {
        name: 'fallback',
        type: '-',
        description: 'Sustituye por completo el contenido alternativo del avatar.',
      },
    ],
    expose: [],
  },
}

export default avatarConfig
