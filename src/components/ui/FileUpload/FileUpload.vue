<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useAttrs, watch } from 'vue'
import { Attachment } from '@/components/ui/Attachment'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import { useFiles } from '@/composables'
import {
  fileUploadDescriptionVariants,
  fileUploadDropzoneVariants,
  fileUploadLabelVariants,
  fileUploadListVariants,
  fileUploadMediaVariants,
  fileUploadVariants,
  type FileUploadContext,
  type FileUploadEmits,
  type FileUploadProps,
  type FileUploadSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<FileUploadProps>(), {
  label: null,
  description: null,
  accept: undefined,
  multiple: false,
  disabled: false,
  name: undefined,
  required: false,
  maxFiles: undefined,
  maxSize: undefined,
  showList: true,
  attachmentMediaVariant: 'default',
  ui: undefined,
})
const emit = defineEmits<FileUploadEmits>()
defineSlots<FileUploadSlots>()

const files = defineModel<File[]>('files', { default: () => [] })
const attrs = useAttrs()
const input = ref<HTMLInputElement>()
const dragDepth = ref(0)
const errors = ref<string[]>([])
const previews = new Map<File, string>()
const isDragging = computed(() => dragDepth.value > 0)
const { t } = useI18n()
const { formatFileSize, getFileIcon } = useFiles()

const fileUploadContext = computed<FileUploadContext>(() => {
  const { ui, ...fileUploadProps } = props
  void ui

  return {
    props: fileUploadProps,
    files: files.value,
    errors: errors.value,
    isDragging: isDragging.value,
    open: openFileDialog,
    remove: removeFile,
    clear: clearFiles,
    clearErrors,
  }
})

const rootProps = computed(() => {
  const ui = useUi(props.ui?.root, fileUploadContext.value)
  return {
    ...attrs,
    ...ui,
    class: cn(fileUploadVariants(), attrs.class, ui.class),
    style: [attrs.style, ui.style],
  }
})

const dropzoneProps = computed(() => {
  const ui = useUi(props.ui?.dropzone, fileUploadContext.value)
  return {
    ...ui,
    role: 'button',
    tabindex: props.disabled ? -1 : 0,
    'aria-disabled': props.disabled,
    'data-dragging': isDragging.value || undefined,
    class: cn(
      fileUploadDropzoneVariants({ dragging: isDragging.value, disabled: props.disabled }),
      ui.class,
    ),
  }
})

const inputProps = computed(() => {
  const ui = useUi(props.ui?.input, fileUploadContext.value)
  return {
    ...ui,
    tabindex: -1,
    accept: props.accept,
    multiple: props.multiple,
    disabled: props.disabled,
    name: props.name,
    required: props.required,
    class: cn('sr-only', ui.class),
  }
})

const mediaProps = computed(() => {
  const ui = useUi(props.ui?.media, fileUploadContext.value)
  return {
    ...ui,
    class: cn(fileUploadMediaVariants({ dragging: isDragging.value }), ui.class),
  }
})

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, fileUploadContext.value)
  return { ...ui, class: cn(fileUploadLabelVariants(), ui.class) }
})

const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, fileUploadContext.value)
  return { ...ui, class: cn(fileUploadDescriptionVariants(), ui.class) }
})

const listProps = computed(() => {
  const ui = useUi(props.ui?.list, fileUploadContext.value)
  return {
    ...ui,
    'data-media-variant': props.attachmentMediaVariant,
    class: cn(fileUploadListVariants({ mediaVariant: props.attachmentMediaVariant }), ui.class),
  }
})

const alertProps = computed(() => {
  return {
    label: t('fileUploadLimitTitle'),
    severity: 'error' as const,
    variant: 'soft' as const,
    icon: { name: 'error' as const },
    closable: true,
  }
})

watch(files, (nextFiles) => {
  for (const [file, preview] of previews) {
    if (!nextFiles.includes(file)) {
      URL.revokeObjectURL(preview)
      previews.delete(file)
    }
  }
})

onBeforeUnmount(() => {
  for (const preview of previews.values()) URL.revokeObjectURL(preview)
  previews.clear()
})

function getFilePreview(file: File) {
  const currentPreview = previews.get(file)
  if (currentPreview) return currentPreview

  const preview = URL.createObjectURL(file)
  previews.set(file, preview)
  return preview
}

function getMediaVariant() {
  return props.attachmentMediaVariant === 'image' ? 'image' : 'default'
}

function updateFiles(nextFiles: File[]) {
  const selectedFiles = props.multiple ? nextFiles : nextFiles.slice(0, 1)
  files.value = selectedFiles
  emit('filesChange', selectedFiles)
}

function addFiles(nextFiles: File[]) {
  clearErrors()

  const incomingFiles = props.multiple ? nextFiles : nextFiles.slice(0, 1)
  const acceptedFiles = props.multiple ? [...files.value] : []
  let totalSize = acceptedFiles.reduce((total, file) => total + file.size, 0)
  let exceedsFileCount = false
  let exceedsTotalSize = false

  for (const file of incomingFiles) {
    if (props.multiple && props.maxFiles !== undefined && acceptedFiles.length >= props.maxFiles) {
      exceedsFileCount = true
      continue
    }

    if (props.maxSize !== undefined && totalSize + file.size > props.maxSize) {
      exceedsTotalSize = true
      continue
    }

    acceptedFiles.push(file)
    totalSize += file.size
  }

  if (exceedsFileCount && props.maxFiles !== undefined) {
    errors.value.push(t('fileUploadMaxFiles', { count: props.maxFiles }))
  }
  if (exceedsTotalSize && props.maxSize !== undefined) {
    errors.value.push(t('fileUploadMaxSize', { size: formatFileSize(props.maxSize) }))
  }

  if (errors.value.length) emit('error', errors.value)
  updateFiles(acceptedFiles)
}

function removeFile(index: number) {
  updateFiles(files.value.filter((_, fileIndex) => fileIndex !== index))
}

function clearFiles() {
  updateFiles([])
  clearErrors()
}

function clearErrors() {
  errors.value = []
}

function openFileDialog() {
  if (!props.disabled) input.value?.click()
}

function handleClick(event: MouseEvent) {
  if (event.target !== input.value) openFileDialog()
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  addFiles(Array.from(target.files ?? []))
  target.value = ''
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  openFileDialog()
}

function handleDragEnter(event: DragEvent) {
  event.preventDefault()
  if (props.disabled || !event.dataTransfer?.types.includes('Files')) return
  dragDepth.value += 1
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
  if (event.dataTransfer) event.dataTransfer.dropEffect = props.disabled ? 'none' : 'copy'
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault()
  if (dragDepth.value > 0) dragDepth.value -= 1
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  dragDepth.value = 0
  if (props.disabled) return
  addFiles(Array.from(event.dataTransfer?.files ?? []))
}
</script>

<template>
  <div v-bind="rootProps" data-slot="file-upload">
    <div
      v-bind="dropzoneProps"
      data-slot="file-upload-dropzone"
      @click="handleClick"
      @keydown="handleKeydown"
      @dragenter="handleDragEnter"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <input
        ref="input"
        v-bind="inputProps"
        type="file"
        data-slot="file-upload-input"
        @change="handleInput"
      />

      <slot v-bind="fileUploadContext">
        <div v-bind="mediaProps" data-slot="file-upload-media">
          <slot name="media" v-bind="fileUploadContext"><Icon name="upload" /></slot>
        </div>

        <div class="space-y-1 text-center" data-slot="file-upload-content">
          <p v-if="props.label || $slots.label" v-bind="labelProps" data-slot="file-upload-label">
            <slot name="label" v-bind="fileUploadContext">{{ props.label }}</slot>
          </p>
          <p
            v-if="props.description || $slots.description"
            v-bind="descriptionProps"
            data-slot="file-upload-description"
          >
            <slot name="description" v-bind="fileUploadContext">{{ props.description }}</slot>
          </p>
        </div>
      </slot>
    </div>

    <slot v-if="errors.length" name="alert" v-bind="fileUploadContext">
      <Alert v-bind="alertProps" @close="clearErrors">
        <template #description>
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </template>
      </Alert>
    </slot>

    <div v-if="props.showList && files.length" v-bind="listProps" data-slot="file-upload-list">
      <template
        v-for="(file, index) in files"
        :key="`${file.name}-${file.size}-${file.lastModified}-${index}`"
      >
        <slot
          name="file"
          v-bind="fileUploadContext"
          :file="file"
          :index="index"
          :remove-file="() => removeFile(index)"
        >
          <Attachment
            class="w-full"
            :label="file.name"
            :description="`${formatFileSize(file.size)}`"
            :media-variant="getMediaVariant()"
            :orientation="getMediaVariant() === 'image' ? 'vertical' : 'horizontal'"
          >
            <template #media>
              <img
                v-if="getMediaVariant() === 'image'"
                :src="getFilePreview(file)"
                :alt="file.name"
                width="60"
                height="60"
              />
              <Icon v-else :name="getFileIcon(file)" />
            </template>
            <template #actions>
              <Button
                type="button"
                variant="plain"
                severity="secondary"
                size="icon-xs"
                :aria-label="t('fileUploadRemove', { name: file.name })"
                icon="x"
                @click="removeFile(index)"
              />
            </template>
          </Attachment>
        </slot>
      </template>
    </div>
  </div>
</template>
