import type { ComponentDocConfig } from '../component-docs'
import AttachmentBasicExample from '../../components/examples/attachment/AttachmentBasicExample.vue'
import AttachmentTitleExample from '../../components/examples/attachment/AttachmentTitleExample.vue'
import AttachmentDescriptionExample from '../../components/examples/attachment/AttachmentDescriptionExample.vue'
import AttachmentIconExample from '../../components/examples/attachment/AttachmentIconExample.vue'
import AttachmentOrientationExample from '../../components/examples/attachment/AttachmentOrientationExample.vue'
import AttachmentSizeExample from '../../components/examples/attachment/AttachmentSizeExample.vue'
import AttachmentStateExample from '../../components/examples/attachment/AttachmentStateExample.vue'
import AttachmentMediaVariantExample from '../../components/examples/attachment/AttachmentMediaVariantExample.vue'
import AttachmentUiExample from '../../components/examples/attachment/AttachmentUiExample.vue'

const attachmentConfig: ComponentDocConfig = {
  slug: 'attachment',
  title: 'Attachment',
  language: 'en',
  description: 'Presents a file with its details, state, and related actions.',
  importPath: '@nono-ui/components/ui/Attachment',
  usage: [
    {
      title: 'Basic file',
      description: 'Show a file name, details, and icon.',
      component: AttachmentBasicExample,
    },
  ],
  examples: [
    {
      title: 'Title',
      description: 'Customize the file name or title displayed in the attachment.',
      component: AttachmentTitleExample,
    },
    {
      title: 'Description',
      description: 'Edit the attachment title and its supporting details.',
      component: AttachmentDescriptionExample,
    },
    {
      title: 'Icon',
      description: 'Choose an icon to identify the file type.',
      component: AttachmentIconExample,
    },
    {
      title: 'Orientation',
      description: 'Choose a horizontal or vertical layout for the attachment.',
      component: AttachmentOrientationExample,
    },
    {
      title: 'Size',
      description: 'Choose the size of the media and file details.',
      component: AttachmentSizeExample,
    },
    {
      title: 'State',
      description: 'Choose the visual state shown for the file.',
      component: AttachmentStateExample,
    },
    {
      title: 'Media variant',
      description: 'Choose between an icon and custom image media.',
      component: AttachmentMediaVariantExample,
    },
    {
      title: 'UI',
      description: 'Customize the media, file details, and actions containers.',
      component: AttachmentUiExample,
    },
  ],
  accessibility: [
    {
      title: 'File information',
      description:
        'Attachment renders a div and does not add interaction semantics by itself. Keep the label and description clear, provide accessible names for buttons in the actions slot, and use descriptive alt text when media contains an image. Decorative icons should have aria-hidden="true"; do not hide informative images from the accessibility tree.',
    },
    {
      title: 'Dynamic states',
      description:
        'state changes the visual presentation and shows a spinner during uploading, but does not announce progress by itself. If the state changes during an operation, communicate the update with visible text and an appropriate aria-live mechanism in the context that controls the upload.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'File name or title.',
      },
      {
        name: 'description',
        type: 'string',
        default: 'undefined',
        description: 'Additional information, such as the file size or type.',
      },
      {
        name: 'icon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: 'undefined',
        description: 'Name of the media icon when mediaVariant is icon.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Direction of the attachment layout.',
      },
      {
        name: 'size',
        type: "'md' | 'sm' | 'xs'",
        default: "'md'",
        description: 'Size of the media and file details.',
      },
      {
        name: 'state',
        type: "'idle' | 'uploading' | 'processing' | 'error' | 'done'",
        default: "'idle'",
        description: 'Visual state of the file. A spinner is shown while uploading.',
      },
      {
        name: 'mediaVariant',
        type: "'icon' | 'image'",
        default: "'icon'",
        description: 'Media type to render: an icon or the content of the media slot.',
      },
      {
        name: 'ui',
        type: `{
  media?: (context: AttachmentContext) => HTMLAttributes
  content?: (context: AttachmentContext) => HTMLAttributes
  label?: (context: AttachmentContext) => HTMLAttributes
  description?: (context: AttachmentContext) => HTMLAttributes
  actions?: (context: AttachmentContext) => HTMLAttributes
}`,
        typePre: true,
        typeParts: [
          { text: '{\n  media?: (context: ' },
          { text: 'AttachmentContext', link: '#attachment-context' },
          { text: ') => HTMLAttributes\n  content?: (context: ' },
          { text: 'AttachmentContext', link: '#attachment-context' },
          { text: ') => HTMLAttributes\n  label?: (context: ' },
          { text: 'AttachmentContext', link: '#attachment-context' },
          { text: ') => HTMLAttributes\n  description?: (context: ' },
          { text: 'AttachmentContext', link: '#attachment-context' },
          { text: ') => HTMLAttributes\n  actions?: (context: ' },
          { text: 'AttachmentContext', link: '#attachment-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        default: 'undefined',
        description:
          'Resolvers for applying attributes, class, style, and ARIA to media, content, label, description, and actions. Every resolver receives the current AttachmentContext.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'media',
        type: 'AttachmentContext',
        typeLink: '#attachment-context',
        description: 'Media content when mediaVariant is image; receives the current state.',
      },
      {
        name: 'label',
        type: 'AttachmentContext',
        typeLink: '#attachment-context',
        description: 'Custom content that replaces label; receives the current state.',
      },
      {
        name: 'description',
        type: 'AttachmentContext',
        typeLink: '#attachment-context',
        description: 'Custom content that replaces description; receives the current state.',
      },
      {
        name: 'actions',
        type: 'AttachmentContext',
        typeLink: '#attachment-context',
        description: 'Actions rendered beside the file details; receives the current state.',
      },
    ],
    configs: [
      {
        id: 'attachment-context',
        title: 'AttachmentContext',
        typeLabel: 'Context',
        showDefault: false,
        description:
          'Shared context passed to each named slot as slot props and to every UI resolver.',
        rows: [
          {
            name: 'state',
            type: "'idle' | 'uploading' | 'processing' | 'error' | 'done'",
            description: 'Current visual state of the attachment; defaults to idle.',
          },
        ],
      },
    ],
    expose: [],
  },
}

export default attachmentConfig
