export const attachmentOrientationNames = ['horizontal', 'vertical'] as const
export const attachmentSizes = ['md', 'sm', 'xs'] as const
export const attachmentStateNames = ['idle', 'uploading', 'processing', 'error', 'done'] as const
export const attachmentMediaVariantNames = ['icon', 'image'] as const
export const attachmentDefaults = {
  label: undefined,
  description: undefined,
  icon: undefined,
  orientation: 'horizontal' as const,
  size: 'md' as const,
  state: 'idle' as const,
  mediaVariant: 'icon' as const,
  ui: undefined,
}
