import type { ComponentDocConfig } from '../component-docs'
import { attachmentMediaVariantNames } from '@/components/ui/Attachment'
import { fileUploadDefaults } from '@/components/ui/FileUpload'
import FileUploadBasicExample from '../../components/examples/file-upload/FileUploadBasicExample.vue'
import FileUploadCustomExample from '../../components/examples/file-upload/FileUploadCustomExample.vue'
import FileUploadImageExample from '../../components/examples/file-upload/FileUploadImageExample.vue'
import FileUploadLimitsExample from '../../components/examples/file-upload/FileUploadLimitsExample.vue'

const uiPartNames = ['root', 'dropzone', 'input', 'media', 'label', 'description', 'list'] as const
const uiType = `{\n${uiPartNames
  .map(
    (part) =>
      `  ${part}?: (context: FileUploadContext) => ${part === 'input' ? 'InputHTMLAttributes' : 'HTMLAttributes'}`,
  )
  .join('\n')}\n}`
const uiTypeParts = [
  { text: '{\n' },
  ...uiPartNames.flatMap((part) => [
    { text: `  ${part}?: (context: ` },
    { text: 'FileUploadContext', link: '#file-upload-context' },
    { text: `) => ${part === 'input' ? 'InputHTMLAttributes' : 'HTMLAttributes'}\n` },
  ]),
  { text: '}' },
]

const fileUploadConfig: ComponentDocConfig = {
  slug: 'file-upload',
  title: 'FileUpload',
  language: 'en',
  description:
    'Select or drop files, enforce count and total size limits, and display removable items.',
  importPath: '@nono-ui/components/ui/FileUpload',
  usage: [
    {
      title: 'Basic upload',
      description: 'Select or drop one file and remove it from the list.',
      component: FileUploadBasicExample,
    },
  ],
  examples: [
    {
      title: 'Selection and limits',
      description: 'Allow multiple files, control the list, and limit count and total size.',
      component: FileUploadLimitsExample,
    },
    {
      title: 'Image previews',
      description: 'Display thumbnails for image files.',
      component: FileUploadImageExample,
    },
    {
      title: 'Slots and UI',
      description: 'Customize the dropzone and replace the file rows.',
      component: FileUploadCustomExample,
    },
  ],
  accessibility: [
    {
      title: 'Name the dropzone',
      description:
        'Provide a label or label slot so the button-like dropzone has an accessible name. It supports click, Enter, and Space. The native file input receives accept, multiple, disabled, name, and required.',
    },
    {
      title: 'Selection feedback',
      description:
        'The list provides named remove buttons. Count and total-size failures render an alert and emit error. The accept prop filters the native picker; dropped files are not filtered by accept, so validate file types before uploading them to a server.',
    },
  ],
  api: {
    props: [
      {
        name: 'files',
        type: 'File[]',
        default: '[]',
        description: 'Selected files. Bind with v-model:files.',
      },
      {
        name: 'label',
        type: 'string | null',
        default: String(fileUploadDefaults.label),
        description: 'Text shown inside the dropzone; also names its button-like surface.',
      },
      {
        name: 'description',
        type: 'string | null',
        default: String(fileUploadDefaults.description),
        description: 'Supporting text shown beneath the label.',
      },
      {
        name: 'accept',
        type: 'string',
        default: String(fileUploadDefaults.accept),
        description: 'Native file picker filter. Dragged files are not filtered by this value.',
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: String(fileUploadDefaults.multiple),
        description:
          'Allows adding several files; otherwise a new selection replaces the previous file.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: String(fileUploadDefaults.disabled),
        description: 'Disables the file input and prevents opening or dropping files.',
      },
      {
        name: 'name',
        type: 'string',
        default: String(fileUploadDefaults.name),
        description: 'Name forwarded to the native file input.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: String(fileUploadDefaults.required),
        description: 'Required state forwarded to the native file input.',
      },
      {
        name: 'maxFiles',
        type: 'number',
        default: String(fileUploadDefaults.maxFiles),
        description: 'Maximum selected file count when multiple is true.',
      },
      {
        name: 'maxSize',
        type: 'number',
        default: String(fileUploadDefaults.maxSize),
        description: 'Maximum combined size of selected files in bytes.',
      },
      {
        name: 'showList',
        type: 'boolean',
        default: String(fileUploadDefaults.showList),
        description: 'Shows selected files and their remove actions.',
      },
      {
        name: 'attachmentMediaVariant',
        type: attachmentMediaVariantNames.map((value) => `'${value}'`).join(' | '),
        default: `'${fileUploadDefaults.attachmentMediaVariant}'`,
        description: 'Uses icons or image thumbnails in the built-in file list.',
      },
      {
        name: 'ui',
        type: uiType,
        typePre: true,
        typeParts: uiTypeParts,
        default: String(fileUploadDefaults.ui),
        description:
          'Resolvers for attributes and classes on internal parts. Each receives FileUploadContext.',
      },
    ],
    configs: [
      {
        id: 'file-upload-context',
        title: 'FileUploadContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to slots and UI resolvers.',
        rows: [
          {
            name: 'props',
            type: "Omit<FileUploadProps, 'ui'>",
            description: 'Current public prop values except ui.',
          },
          { name: 'files', type: 'File[]', description: 'Current selected files.' },
          {
            name: 'errors',
            type: 'string[]',
            description: 'Current count and size error messages.',
          },
          {
            name: 'isDragging',
            type: 'boolean',
            description: 'Whether files are over the dropzone.',
          },
          { name: 'open', type: '() => void', description: 'Opens the native file picker.' },
          {
            name: 'remove',
            type: '(index: number) => void',
            description: 'Removes one selected file.',
          },
          { name: 'clear', type: '() => void', description: 'Clears selected files and errors.' },
          {
            name: 'clearErrors',
            type: '() => void',
            description: 'Dismisses count and size errors.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'update:files',
        type: '[files: File[]]',
        description: 'Emitted when the selected files change through the component.',
      },
      {
        name: 'filesChange',
        type: '[files: File[]]',
        description: 'Emitted after adding, removing, or clearing files.',
      },
      {
        name: 'error',
        type: '[errors: string[]]',
        description: 'Emitted when a selection exceeds maxFiles or maxSize.',
      },
    ],
    slots: [
      {
        name: 'default',
        type: 'FileUploadContext',
        typeLink: '#file-upload-context',
        description: 'Replaces the built-in media, label, and description inside the dropzone.',
      },
      {
        name: 'media',
        type: 'FileUploadContext',
        typeLink: '#file-upload-context',
        description: 'Replaces the upload icon when the default slot is absent.',
      },
      {
        name: 'label',
        type: 'FileUploadContext',
        typeLink: '#file-upload-context',
        description: 'Replaces the label text when the default slot is absent.',
      },
      {
        name: 'description',
        type: 'FileUploadContext',
        typeLink: '#file-upload-context',
        description: 'Replaces the description text when the default slot is absent.',
      },
      {
        name: 'alert',
        type: 'FileUploadContext',
        typeLink: '#file-upload-context',
        description: 'Replaces the limit-error alert while errors are present.',
      },
      {
        name: 'file',
        type: 'FileUploadContext & { file: File; index: number; removeFile: () => void }',
        description: 'Replaces each selected file row when showList is true.',
      },
    ],
    expose: [],
  },
}

export default fileUploadConfig
