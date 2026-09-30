import type { ButtonEmits, ButtonProps } from '@/components/ui/Button'
import type { RouterLinkProps } from 'vue-router'
import type { EmitsAsProps } from '@/types/emits'

export { default as Link } from './Link.vue'

// Props
export type LinkProps = Omit<ButtonProps, 'as' | 'asChild' | 'loading'> &
  Partial<Pick<RouterLinkProps, 'to' | 'replace'>>

export type LinkVariant = NonNullable<ButtonProps['variant']>
export type LinkSize = NonNullable<ButtonProps['size']>

// Emits
export type LinkEmits = ButtonEmits

// Slots
export interface LinkSlots {
  default?(): unknown
  leading?(): unknown
  trailing?(): unknown
}

// Normalize
export type NormalizeLinkProps = LinkProps & EmitsAsProps<LinkEmits>
