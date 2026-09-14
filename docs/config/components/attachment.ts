import type { ComponentDocConfig } from '../component-docs'
import AttachmentIconExample from '../../components/examples/attachment/AttachmentIconExample.vue'
import AttachmentMediaVariantExample from '../../components/examples/attachment/AttachmentMediaVariantExample.vue'
import AttachmentOrientationExample from '../../components/examples/attachment/AttachmentOrientationExample.vue'
import AttachmentSizeExample from '../../components/examples/attachment/AttachmentSizeExample.vue'
import AttachmentSlotsExample from '../../components/examples/attachment/AttachmentSlotsExample.vue'
import AttachmentStateExample from '../../components/examples/attachment/AttachmentStateExample.vue'
import AttachmentUIExample from '../../components/examples/attachment/AttachmentUIExample.vue'
import AttachmentUsageExample from '../../components/examples/attachment/AttachmentUsageExample.vue'

const attachmentConfig: ComponentDocConfig = {
  slug: 'attachment',
  title: 'Attachment',
  description: 'Presenta un archivo con su información, estado y acciones relacionadas.',
  importPath: '@nono-cn/nono-ui/components/ui/Attachment',
  usage: [
    {
      title: 'Uso básico',
      description:
        'Combina label, description, icon y el slot actions para representar un archivo.',
      component: AttachmentUsageExample,
    },
  ],
  examples: [
    {
      title: 'Icon',
      description: 'Selecciona el icono que se muestra junto a la información del archivo.',
      component: AttachmentIconExample,
    },
    {
      title: 'Orientation',
      description: 'Cambia entre una presentación horizontal y una tarjeta vertical.',
      component: AttachmentOrientationExample,
    },
    {
      title: 'Size',
      description: 'Ajusta el tamaño de la miniatura, el texto y el espaciado interno.',
      component: AttachmentSizeExample,
    },
    {
      title: 'State',
      description: 'Representa los estados idle, uploading, processing, error y done.',
      component: AttachmentStateExample,
    },
    {
      title: 'Media variant',
      description: 'Usa un icono o proporciona una vista previa personalizada mediante media.',
      component: AttachmentMediaVariantExample,
    },
    {
      title: 'UI',
      description: 'Personaliza las partes internas con resolvers de atributos y clases.',
      component: AttachmentUIExample,
    },
    {
      title: 'Slots',
      description: 'Sustituye la media, los textos y las acciones con contenido propio.',
      component: AttachmentSlotsExample,
    },
  ],
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
