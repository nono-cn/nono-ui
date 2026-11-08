import type { ButtonSize, IconButtonSize } from '@/components/Button'

export function toIconButtonSize(size: ButtonSize = 'md'): IconButtonSize {
  if (size === 'icon' || size === 'md') return 'icon'
  return size.startsWith('icon-') ? (size as IconButtonSize) : (`icon-${size}` as IconButtonSize)
}
