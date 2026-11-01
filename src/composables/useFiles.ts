import type { IconName } from '@/components/Icon'
import { getCurrentScope, onScopeDispose, toValue, watch, type MaybeRefOrGetter } from 'vue'

export type FileState = 'idle' | 'uploading' | 'processing' | 'error' | 'done'

export function formatFileSize(bytes: number, decimals = 1) {
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024))
  const value = bytes / 1024 ** unitIndex

  return `${value.toFixed(unitIndex === 0 ? 0 : decimals)} ${units[unitIndex]}`
}

export function getFileIcon(file: File, state: FileState = 'idle'): IconName {
  if (state === 'uploading' || state === 'processing') return 'spinner'
  if (state === 'error') return 'error'
  if (state === 'done') return 'success'

  const extension = file.name.split('.').pop()?.toLowerCase()

  if (file.type.startsWith('image/')) return 'image'
  if (file.type.startsWith('audio/')) return 'audio'
  if (file.type.startsWith('video/')) return 'video'
  if (
    file.type.startsWith('text/') ||
    ['pdf', 'doc', 'docx', 'txt', 'md'].includes(extension ?? '')
  )
    return 'fileText'
  if (['csv', 'xls', 'xlsx', 'ods'].includes(extension ?? '')) return 'fileSpreadsheet'
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension ?? '')) return 'fileArchive'

  return 'file'
}

export function useFiles(files?: MaybeRefOrGetter<readonly File[]>) {
  const previews = new Map<File, string>()

  function getFilePreview(file: File) {
    const currentPreview = previews.get(file)
    if (currentPreview) return currentPreview

    const preview = URL.createObjectURL(file)
    previews.set(file, preview)
    return preview
  }

  function revokeFilePreview(file: File) {
    const preview = previews.get(file)
    if (!preview) return

    URL.revokeObjectURL(preview)
    previews.delete(file)
  }

  function clearFilePreviews() {
    for (const preview of previews.values()) URL.revokeObjectURL(preview)
    previews.clear()
  }

  if (files) {
    watch(
      () => toValue(files),
      (nextFiles) => {
        for (const file of previews.keys()) {
          if (!nextFiles.includes(file)) revokeFilePreview(file)
        }
      },
    )
  }

  if (getCurrentScope()) onScopeDispose(clearFilePreviews)

  return {
    formatFileSize,
    getFileIcon,
    getFilePreview,
    revokeFilePreview,
    clearFilePreviews,
  }
}
