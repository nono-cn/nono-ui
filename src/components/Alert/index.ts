import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { IconName } from '@/components/Icon'
import { alertDefaults, alertVariantNames } from './constants'

export { default as Alert } from './Alert.vue'
export { alertDefaults, alertVariantNames } from './constants'

export const alertVariants = cva(
  'grid w-full items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm',
  {
    variants: {
      variant: {
        solid: 'border-transparent bg-(--alert-solid) text-(--alert-solid-foreground)',
        outline: 'border-(--alert-color)/40 bg-transparent text-(--alert-color)',
        plain: 'border-transparent bg-transparent text-(--alert-color)',
        subtle: 'border-(--alert-color)/20 bg-(--alert-color)/10 text-(--alert-color)',
        soft: 'border-transparent bg-(--alert-color)/10 text-(--alert-color)',
      } satisfies Record<(typeof alertVariantNames)[number], string>,
      icon: {
        true: 'grid-cols-[calc(var(--spacing)*4)_1fr_auto] gap-x-3',
        false: 'grid-cols-[0_1fr_auto]',
      },
    },
    defaultVariants: {
      variant: alertDefaults.variant,
    },
  },
)

export const alertIconContainerVariants = cva(
  'flex size-4 translate-y-0.5 items-center justify-center [&>svg]:size-full',
)

export const alertLabelVariants = cva('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight')

export const alertDescriptionVariants = cva('col-start-2 text-current/80 [&_p]:leading-relaxed')

export const alertCloseButtonContainerVariants = cva(
  'col-start-3 row-start-1 -my-1.5 ms-2 -me-2 self-start',
)

export type AlertVariants = VariantProps<typeof alertVariants>
export type AlertVariant = NonNullable<AlertVariants['variant']>

// Props
export interface AlertProps {
  label?: string
  description?: string
  icon?: IconName
  variant?: AlertVariant
  color?: string
  closable?: boolean
  decorative?: boolean
  ui?: AlertUI
}

// Fn
export type AlertFn<T> = () => T

// UI
export interface AlertUI {
  label?: AlertFn<HTMLAttributes>
  description?: AlertFn<HTMLAttributes>
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
