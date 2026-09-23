import type { ComponentDocConfig } from '../component-docs'
import AttachmentBasicExample from '../../components/examples/attachment/AttachmentBasicExample.vue'
import AttachmentIconExample from '../../components/examples/attachment/AttachmentIconExample.vue'
import AttachmentOrientationExample from '../../components/examples/attachment/AttachmentOrientationExample.vue'
import AttachmentSizesExample from '../../components/examples/attachment/AttachmentSizesExample.vue'
import AttachmentStateExample from '../../components/examples/attachment/AttachmentStateExample.vue'
import AttachmentMediaVariantExample from '../../components/examples/attachment/AttachmentMediaVariantExample.vue'

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
      title: 'Icon',
      description: 'Add an icon to identify the file type visually.',
      component: AttachmentIconExample,
    },
    {
      title: 'Orientation',
      description: 'Arrange the media and details horizontally or vertically.',
      component: AttachmentOrientationExample,
    },
    {
      title: 'Size',
      description: 'Compare the md, sm, and xs sizes.',
      component: AttachmentSizesExample,
    },
    {
      title: 'States',
      description: 'Compare the available visual states for a file.',
      component: AttachmentStateExample,
    },
    {
      title: 'Media variant',
      description: 'Switch between icon and image media.',
      component: AttachmentMediaVariantExample,
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
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description: 'Media icon configuration when mediaVariant is icon.',
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
  media?: () => HTMLAttributes
  content?: () => HTMLAttributes
  label?: () => HTMLAttributes
  description?: () => HTMLAttributes
  actions?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers for applying attributes, class, style, and ARIA to media, content, label, description, and actions.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'media',
        type: '-',
        description: 'Media content when mediaVariant is image.',
      },
      {
        name: 'label',
        type: '-',
        description: 'Custom content that replaces label.',
      },
      {
        name: 'description',
        type: '-',
        description: 'Custom content that replaces description.',
      },
      {
        name: 'actions',
        type: '-',
        description: 'Actions rendered beside the file details.',
      },
    ],
    expose: [],
  },
}

export default attachmentConfig
