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
        solid: 'border-transparent bg-(--kbd-solid) text-(--kbd-solid-foreground)',
        outline: 'border-(--kbd-color)/40 bg-transparent text-(--kbd-color)',
        soft: 'border-transparent bg-(--kbd-color)/10 text-(--kbd-color)',
        subtle: 'border-(--kbd-color)/20 bg-(--kbd-color)/10 text-(--kbd-color)',
      },
      severity: {
        primary:
          '[--kbd-color:var(--primary)] [--kbd-solid:var(--primary)] [--kbd-solid-foreground:var(--primary-foreground)]',
        neutral:
          '[--kbd-color:var(--foreground)] [--kbd-solid:var(--foreground)] [--kbd-solid-foreground:var(--background)]',
        secondary:
          '[--kbd-color:var(--secondary-foreground)] [--kbd-solid:var(--secondary)] [--kbd-solid-foreground:var(--secondary-foreground)]',
        warning:
          '[--kbd-color:var(--warning)] [--kbd-solid:var(--warning)] [--kbd-solid-foreground:var(--warning-foreground)]',
        success:
          '[--kbd-color:var(--success)] [--kbd-solid:var(--success)] [--kbd-solid-foreground:var(--success-foreground)]',
        error:
          '[--kbd-color:var(--error)] [--kbd-solid:var(--error)] [--kbd-solid-foreground:var(--error-foreground)]',
      },
      color: {
        true: '[--kbd-solid:var(--kbd-color)] [--kbd-solid-foreground:var(--kbd-color-foreground)]',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'subtle',
      severity: 'neutral',
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
