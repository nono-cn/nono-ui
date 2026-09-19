import type { ComponentDocConfig } from '../component-docs'
import AttachmentPlaygroundExample from '../../components/examples/attachment/AttachmentPlaygroundExample.vue'

const attachmentConfig: ComponentDocConfig = {
  slug: 'attachment',
  title: 'Attachment',
  description: 'Presenta un archivo con su información, estado y acciones relacionadas.',
  importPath: '@nono-cn/nono-ui/components/ui/Attachment',
  playground: AttachmentPlaygroundExample,
  usage: [],
  examples: [],
  accessibility: [
    {
      title: 'Información del archivo',
      description:
        'Attachment renderiza un div y no añade semántica de interacción por sí mismo. Mantén un label y una description comprensibles, proporciona un nombre accesible a los botones del slot actions y usa alt descriptivo cuando media contenga una imagen. Los iconos decorativos deben llevar aria-hidden="true"; si una imagen aporta información, no la ocultes del árbol de accesibilidad.',
    },
    {
      title: 'Estados dinámicos',
      description:
        'state cambia la presentación visual y muestra un spinner durante uploading, pero no anuncia por sí solo el progreso. Si el estado se actualiza durante una operación, comunica el cambio con texto visible y el mecanismo aria-live adecuado en el contexto que controla la carga.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Nombre o título del archivo.',
      },
      {
        name: 'description',
        type: 'string',
        default: 'undefined',
        description: 'Información complementaria, como el tamaño o el tipo de archivo.',
      },
      {
        name: 'icon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description: 'Configuración del icono de media cuando mediaVariant es icon.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Dirección de la composición del attachment.',
      },
      {
        name: 'size',
        type: "'md' | 'sm' | 'xs'",
        default: "'md'",
        description: 'Tamaño de la media y de la información del archivo.',
      },
      {
        name: 'state',
        type: "'idle' | 'uploading' | 'processing' | 'error' | 'done'",
        default: "'idle'",
        description: 'Estado visual del archivo. Durante uploading se muestra un spinner.',
      },
      {
        name: 'mediaVariant',
        type: "'icon' | 'image'",
        default: "'icon'",
        description: 'Tipo de media renderizada: icono o contenido del slot media.',
      },
      {
        name: 'ui',
        type: `{
  media?: () => HTMLAttributes
  content?: () => HTMLAttributes
  label?: () => HTMLAttributes
  description?: () => HTMLAttributes
  actions?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers para aplicar atributos, class, style y ARIA a media, content, label, description y actions.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'media',
        type: '-',
        description: 'Contenido de la media cuando mediaVariant es image.',
      },
      {
        name: 'label',
        type: '-',
        description: 'Contenido personalizado que sustituye a label.',
      },
      {
        name: 'description',
        type: '-',
        description: 'Contenido personalizado que sustituye a description.',
      },
      {
        name: 'actions',
        type: '-',
        description: 'Acciones renderizadas junto a la información del archivo.',
      },
    ],
    expose: [],
  },
}

export default attachmentConfig
