import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes, InputHTMLAttributes } from 'vue'
import type { AttachmentMediaVariants } from '@/components/Attachment'

export { default as FileUpload } from './FileUpload.vue'

export const fileUploadVariants = cva('grid w-full gap-3')

export const fileUploadDropzoneVariants = cva(
  'relative flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50',
  {
    variants: {
      dragging: {
        true: 'border-primary bg-primary/5',
        false: 'border-muted-foreground/25 hover:border-muted-foreground/50',
      },
      disabled: {
        true: 'pointer-events-none cursor-not-allowed opacity-50',
        false: '',
      },
    },
    defaultVariants: { dragging: false, disabled: false },
  },
)

export const fileUploadMediaVariants = cva(
  'flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors [&_svg:not([class*=size-])]:size-5',
  {
    variants: {
      dragging: { true: 'bg-primary/10 text-primary', false: '' },
    },
    defaultVariants: { dragging: false },
  },
)

export const fileUploadLabelVariants = cva('text-sm font-medium')
export const fileUploadDescriptionVariants = cva('text-xs text-muted-foreground')

export const fileUploadListVariants = cva('grid gap-2', {
  variants: {
    mediaVariant: {
      default: 'grid-cols-1',
      image: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    },
  },
  defaultVariants: { mediaVariant: 'default' },
})

export type FileUploadVariants = VariantProps<typeof fileUploadDropzoneVariants>
export type FileUploadFn<T> = (context: FileUploadContext) => T

export interface FileUploadUI {
  root?: FileUploadFn<HTMLAttributes>
  dropzone?: FileUploadFn<HTMLAttributes>
  input?: FileUploadFn<InputHTMLAttributes>
  media?: FileUploadFn<HTMLAttributes>
  label?: FileUploadFn<HTMLAttributes>
  description?: FileUploadFn<HTMLAttributes>
  list?: FileUploadFn<HTMLAttributes>
}

export interface FileUploadProps {
  files?: File[]
  label?: string | null
  description?: string | null
  accept?: string
  multiple?: boolean
  disabled?: boolean
  name?: string
  required?: boolean
  maxFiles?: number
  maxSize?: number
  showList?: boolean
  attachmentMediaVariant?: AttachmentMediaVariants['variant']
  ui?: FileUploadUI
}

export interface FileUploadContext {
  props: Omit<FileUploadProps, 'ui'>
  files: File[]
  errors: string[]
  isDragging: boolean
  open: () => void
  remove: (index: number) => void
  clear: () => void
  clearErrors: () => void
}

export interface FileUploadEmits {
  'update:files': [files: File[]]
  filesChange: [files: File[]]
  error: [errors: string[]]
}

export interface FileUploadSlots {
  default?(props: FileUploadContext): unknown
  media?(props: FileUploadContext): unknown
  label?(props: FileUploadContext): unknown
  description?(props: FileUploadContext): unknown
  alert?(props: FileUploadContext): unknown
  file?(props: FileUploadContext & { file: File; index: number; removeFile: () => void }): unknown
}
