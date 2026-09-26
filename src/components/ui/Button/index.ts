import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { IconConfig } from '@/components/ui/Icon'
import type { PrimitiveProps } from 'reka-ui'
import type { EmitsAsProps } from '@/types/emits'

export { default as Button } from './Button.vue'

const buttonStateVariables = [
  '[--button-solid-hover:color-mix(in_oklab,var(--button-solid)_90%,transparent)]',
  '[--button-solid-active:color-mix(in_oklab,var(--button-solid)_80%,transparent)]',
  '[--button-outline-border:color-mix(in_oklab,var(--button-color)_40%,transparent)]',
  '[--button-outline-hover:color-mix(in_oklab,var(--button-color)_10%,transparent)]',
  '[--button-outline-active-border:color-mix(in_oklab,var(--button-color)_60%,transparent)]',
  '[--button-outline-active:color-mix(in_oklab,var(--button-color)_20%,transparent)]',
  '[--button-plain-hover:color-mix(in_oklab,var(--button-color)_10%,transparent)]',
  '[--button-plain-active:color-mix(in_oklab,var(--button-color)_20%,transparent)]',
  '[--button-subtle-border:color-mix(in_oklab,var(--button-color)_20%,transparent)]',
  '[--button-subtle-bg:color-mix(in_oklab,var(--button-color)_10%,transparent)]',
  '[--button-subtle-hover:color-mix(in_oklab,var(--button-color)_15%,transparent)]',
  '[--button-subtle-active:color-mix(in_oklab,var(--button-color)_25%,transparent)]',
  '[--button-soft-bg:color-mix(in_oklab,var(--button-color)_10%,transparent)]',
  '[--button-soft-hover:color-mix(in_oklab,var(--button-color)_20%,transparent)]',
  '[--button-soft-active:color-mix(in_oklab,var(--button-color)_30%,transparent)]',
].join(' ')

export const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
    buttonStateVariables,
  ].join(' '),
  {
    variants: {
      variant: {
        solid:
          'bg-(--button-solid) text-(--button-solid-foreground) hover:bg-(--button-solid-hover) active:bg-(--button-solid-active)',
        outline:
          'border bg-transparent border-(--button-outline-border) text-(--button-color) hover:bg-(--button-outline-hover) active:border-(--button-outline-active-border) active:bg-(--button-outline-active)',
        plain:
          'bg-transparent text-(--button-color) hover:bg-(--button-plain-hover) active:bg-(--button-plain-active)',
        subtle:
          'border border-(--button-subtle-border) bg-(--button-subtle-bg) text-(--button-color) hover:bg-(--button-subtle-hover) active:bg-(--button-subtle-active)',
        soft: 'bg-(--button-soft-bg) text-(--button-color) hover:bg-(--button-soft-hover) active:bg-(--button-soft-active)',
        link: 'bg-transparent underline underline-offset-4 hover:no-underline text-(--button-color)',
      },
      severity: {
        primary:
          'focus-visible:border-primary focus-visible:ring-primary/30 [--button-color:var(--primary)] [--button-solid:var(--primary)] [--button-solid-foreground:var(--primary-foreground)]',
        neutral: [
          'focus-visible:border-foreground focus-visible:ring-foreground/30',
          '[--button-color:var(--foreground)]',
          '[--button-solid:var(--foreground)]',
          '[--button-solid-foreground:var(--background)]',
          '[--button-outline-border:color-mix(in_oklab,var(--foreground)_30%,transparent)]',
          '[--button-outline-hover:var(--muted)]',
          '[--button-outline-active-border:var(--button-outline-border)]',
          '[--button-outline-active:color-mix(in_oklab,var(--muted)_80%,transparent)]',
          '[--button-plain-hover:var(--muted)]',
          '[--button-plain-active:color-mix(in_oklab,var(--muted)_80%,transparent)]',
          '[--button-subtle-border:var(--border)]',
          '[--button-subtle-bg:var(--muted)]',
          '[--button-subtle-hover:color-mix(in_oklab,var(--muted)_80%,transparent)]',
          '[--button-subtle-active:color-mix(in_oklab,var(--muted)_70%,transparent)]',
          '[--button-soft-bg:var(--muted)]',
          '[--button-soft-hover:color-mix(in_oklab,var(--muted)_80%,transparent)]',
          '[--button-soft-active:color-mix(in_oklab,var(--muted)_70%,transparent)]',
        ].join(' '),
        secondary: [
          'focus-visible:border-secondary-foreground focus-visible:ring-secondary-foreground/20',
          '[--button-color:var(--secondary-foreground)]',
          '[--button-solid:var(--secondary)]',
          '[--button-solid-foreground:var(--secondary-foreground)]',
          '[--button-solid-hover:color-mix(in_oklab,var(--secondary)_80%,transparent)]',
          '[--button-solid-active:color-mix(in_oklab,var(--secondary)_70%,transparent)]',
          '[--button-outline-border:color-mix(in_oklab,var(--secondary-foreground)_30%,transparent)]',
          '[--button-outline-hover:var(--secondary)]',
          '[--button-outline-active-border:var(--button-outline-border)]',
          '[--button-outline-active:color-mix(in_oklab,var(--secondary)_70%,transparent)]',
          '[--button-plain-hover:var(--secondary)]',
          '[--button-plain-active:color-mix(in_oklab,var(--secondary)_70%,transparent)]',
          '[--button-subtle-border:color-mix(in_oklab,var(--secondary-foreground)_15%,transparent)]',
          '[--button-subtle-bg:color-mix(in_oklab,var(--secondary)_60%,transparent)]',
          '[--button-subtle-hover:color-mix(in_oklab,var(--secondary)_80%,transparent)]',
          '[--button-subtle-active:var(--secondary)]',
          '[--button-soft-bg:color-mix(in_oklab,var(--secondary)_60%,transparent)]',
          '[--button-soft-hover:color-mix(in_oklab,var(--secondary)_80%,transparent)]',
          '[--button-soft-active:var(--secondary)]',
        ].join(' '),
        warning:
          'focus-visible:border-warning focus-visible:ring-warning/30 [--button-color:var(--warning)] [--button-solid:var(--warning)] [--button-solid-foreground:var(--warning-foreground)]',
        success:
          'focus-visible:border-success focus-visible:ring-success/30 [--button-color:var(--success)] [--button-solid:var(--success)] [--button-solid-foreground:var(--success-foreground)]',
        error:
          'focus-visible:border-error focus-visible:ring-error/30 [--button-color:var(--error)] [--button-solid:var(--error)] [--button-solid-foreground:var(--error-foreground)]',
      },
      size: {
        xs: 'h-7 gap-1 px-2.5 text-xs has-[>svg]:px-2 [--button-square-size:calc(var(--spacing)*7)]',
        sm: 'h-8 gap-1.5 px-3 text-sm has-[>svg]:px-2.5 [--button-square-size:calc(var(--spacing)*8)]',
        md: 'h-9 px-4 py-2 text-base has-[>svg]:px-3 [--button-square-size:calc(var(--spacing)*9)]',
        lg: 'h-10 px-6 text-lg has-[>svg]:px-4 [--button-square-size:calc(var(--spacing)*10)]',
      },
      rounded: {
        true: 'rounded-full',
        false: '',
      },
      square: {
        true: 'size-(--button-square-size) p-0 has-[>svg]:p-0',
        false: '',
      },
      raised: {
        true: 'shadow-sm',
        false: '',
      },
      color: {
        true: [
          'focus-visible:border-(--button-color) focus-visible:ring-(--button-color)/30',
          '[--button-solid:var(--button-color)]',
          '[--button-solid-foreground:var(--button-color-foreground)]',
          buttonStateVariables,
        ].join(' '),
        false: '',
      },
    },
    defaultVariants: {
      variant: 'solid',
      severity: 'primary',
      size: 'md',
      rounded: false,
      square: false,
      raised: false,
      color: false,
    },
  },
)

// Variants
export type ButtonVariants = VariantProps<typeof buttonVariants>
export type ButtonVariant = NonNullable<ButtonVariants['variant']>
export type ButtonSeverity = NonNullable<ButtonVariants['severity']>
export type ButtonSize = NonNullable<ButtonVariants['size']>

// Props
export interface ButtonProps extends Pick<PrimitiveProps, 'as' | 'asChild'> {
  label?: string
  variant?: ButtonVariant
  severity?: ButtonSeverity
  size?: ButtonSize
  rounded?: ButtonVariants['rounded'] | boolean
  square?: ButtonVariants['square'] | boolean
  raised?: ButtonVariants['raised'] | boolean
  loading?: boolean
  color?: string
  icon?: IconConfig
  trailingIcon?: IconConfig
}

// Emits
export interface ButtonEmits {
  click: [event: PointerEvent]
}

// Slots
export interface ButtonSlots {
  default?(): unknown
  leading?(): unknown
  loading?(): unknown
  trailing?(): unknown
}

export type NormalizeButtonProps = ButtonProps & EmitsAsProps<ButtonEmits> & HTMLAttributes
