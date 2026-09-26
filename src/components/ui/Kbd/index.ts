import { cva, type VariantProps } from 'class-variance-authority'

export { default as Kbd } from './Kbd.vue'
export { default as KbdGroup } from './KbdGroup.vue'

export const kbdGroupVariants = cva('inline-flex items-center gap-1')

export const kbdVariants = cva(
  'pointer-events-none inline-flex w-fit min-w-5 items-center justify-center gap-1 rounded-sm border font-sans font-medium uppercase select-none [&_svg:not([class*="size-"])]:size-3',
  {
    variants: {
      size: {
        sm: 'h-4 min-w-4 px-1 text-[10px]',
        md: 'h-5 min-w-5 px-1 text-[11px]',
        lg: 'h-6 min-w-6 px-1 text-xs',
      },
      variant: {
        solid: '',
        outline: 'bg-transparent',
        soft: '',
        subtle: 'border',
      },
      severity: {
        primary: '',
        neutral: '',
        secondary: '',
        warning: '',
        success: '',
        error: '',
      },
      color: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        severity: 'primary',
        class: 'border-transparent bg-primary text-primary-foreground',
      },
      {
        variant: 'outline',
        severity: 'primary',
        class: 'border-primary/40 text-primary',
      },
      {
        variant: 'soft',
        severity: 'primary',
        class: 'border-transparent bg-primary/10 text-primary',
      },
      {
        variant: 'subtle',
        severity: 'primary',
        class: 'border-primary/20 bg-primary/10 text-primary',
      },
      {
        variant: 'solid',
        severity: 'neutral',
        class: 'border-transparent bg-foreground text-background',
      },
      {
        variant: 'outline',
        severity: 'neutral',
        class: 'border-foreground/30 text-foreground',
      },
      {
        variant: 'soft',
        severity: 'neutral',
        class: 'border-transparent bg-muted text-foreground',
      },
      {
        variant: 'subtle',
        severity: 'neutral',
        class: 'border-border bg-muted text-foreground',
      },
      {
        variant: 'solid',
        severity: 'secondary',
        class: 'border-transparent bg-secondary text-secondary-foreground',
      },
      {
        variant: 'outline',
        severity: 'secondary',
        class: 'border-secondary-foreground/30 text-secondary-foreground',
      },
      {
        variant: 'soft',
        severity: 'secondary',
        class: 'border-transparent bg-secondary/60 text-secondary-foreground',
      },
      {
        variant: 'subtle',
        severity: 'secondary',
        class: 'border-secondary-foreground/15 bg-secondary/60 text-secondary-foreground',
      },
      {
        variant: 'solid',
        severity: 'warning',
        class: 'border-transparent bg-warning text-warning-foreground',
      },
      {
        variant: 'outline',
        severity: 'warning',
        class: 'border-warning/40 text-warning',
      },
      {
        variant: 'soft',
        severity: 'warning',
        class: 'border-transparent bg-warning/10 text-warning',
      },
      {
        variant: 'subtle',
        severity: 'warning',
        class: 'border-warning/20 bg-warning/10 text-warning',
      },
      {
        variant: 'solid',
        severity: 'success',
        class: 'border-transparent bg-success text-success-foreground',
      },
      {
        variant: 'outline',
        severity: 'success',
        class: 'border-success/40 text-success',
      },
      {
        variant: 'soft',
        severity: 'success',
        class: 'border-transparent bg-success/10 text-success',
      },
      {
        variant: 'subtle',
        severity: 'success',
        class: 'border-success/20 bg-success/10 text-success',
      },
      {
        variant: 'solid',
        severity: 'error',
        class: 'border-transparent bg-error text-error-foreground',
      },
      {
        variant: 'outline',
        severity: 'error',
        class: 'border-error/40 text-error',
      },
      {
        variant: 'soft',
        severity: 'error',
        class: 'border-transparent bg-error/10 text-error',
      },
      {
        variant: 'subtle',
        severity: 'error',
        class: 'border-error/20 bg-error/10 text-error',
      },
      {
        color: true,
        variant: 'solid',
        class: 'border-transparent bg-(--kbd-color) text-(--kbd-color-foreground)',
      },
      {
        color: true,
        variant: 'outline',
        class: 'border-(--kbd-color)/40 bg-transparent text-(--kbd-color)',
      },
      {
        color: true,
        variant: 'soft',
        class: 'border-transparent bg-(--kbd-color)/10 text-(--kbd-color)',
      },
      {
        color: true,
        variant: 'subtle',
        class: 'border-(--kbd-color)/20 bg-(--kbd-color)/10 text-(--kbd-color)',
      },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'soft',
      severity: 'secondary',
      color: false,
    },
  },
)

export type KbdVariants = VariantProps<typeof kbdVariants>
export type KbdSize = NonNullable<KbdVariants['size']>
export type KbdVariant = NonNullable<KbdVariants['variant']>
export type KbdSeverity = NonNullable<KbdVariants['severity']>

export interface KbdProps {
  label?: string
  size?: KbdSize
  variant?: KbdVariant
  severity?: KbdSeverity
  color?: string
}

export interface KbdSlots {
  default?(): unknown
}

export type KbdGroupProps = Record<string, never>

export interface KbdGroupSlots {
  default?(): unknown
}
