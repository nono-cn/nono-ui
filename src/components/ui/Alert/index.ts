import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { NormalizeButtonProps } from '@/components/ui/Button'
import type { IconName } from '@/components/ui/Icon'
import { alertVariantNames } from './constants'

export { default as Alert } from './Alert.vue'
export { alertVariantNames } from './constants'

export const alertVariants = cva('', {
  variants: {
    variant: {
      solid: 'border-transparent bg-(--alert-solid) text-(--alert-solid-foreground)',
      outline: 'border-(--alert-color)/40 bg-transparent text-(--alert-color)',
      plain: 'border-transparent bg-transparent text-(--alert-color)',
      subtle: 'border-(--alert-color)/20 bg-(--alert-color)/10 text-(--alert-color)',
      soft: 'border-transparent bg-(--alert-color)/10 text-(--alert-color)',
    } satisfies Record<(typeof alertVariantNames)[number], string>,
  },
  defaultVariants: {
    variant: 'soft',
  },
})

export type AlertVariants = VariantProps<typeof alertVariants>
export type AlertVariant = NonNullable<AlertVariants['variant']>

// Fn
export type AlertFn<T> = () => T

// Props
export interface AlertProps {
  label?: string
  description?: string
  icon?: IconName
  closeButton?: NormalizeButtonProps
  variant?: AlertVariant
  color?: string
  closable?: boolean
  decorative?: boolean
  ui?: AlertUI
}

// UI
export interface AlertUI {
  label?: AlertFn<HTMLAttributes>
  description?: AlertFn<HTMLAttributes>
  closeButtonContainer?: AlertFn<HTMLAttributes>
}

// Emits
export interface AlertEmits {
  close: []
}

// Slots
export interface AlertSlots {
  icon?(): unknown
  label?(): unknown
  description?(): unknown
  close?(props: { close: () => void }): unknown
}
