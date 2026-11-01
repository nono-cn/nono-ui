import { cva, type VariantProps } from 'class-variance-authority'
import { kbdDefaults, kbdSizes, kbdVariantNames } from './constants'

export { default as Kbd } from './Kbd.vue'
export { default as KbdGroup } from './KbdGroup.vue'
export { kbdDefaults, kbdSizes, kbdVariantNames } from './constants'

export const kbdGroupVariants = cva('inline-flex items-center gap-1')

export const kbdVariants = cva(
  'pointer-events-none inline-flex w-fit min-w-5 items-center justify-center gap-1 rounded-(--kbd-radius) border font-sans font-medium uppercase select-none [&_svg:not([class*="size-"])]:size-3',
  {
    variants: {
      size: {
        sm: 'h-4 min-w-4 px-1 text-[10px]',
        md: 'h-5 min-w-5 px-1 text-[11px]',
        lg: 'h-6 min-w-6 px-1 text-xs',
      } satisfies Record<(typeof kbdSizes)[number], string>,
      variant: {
        solid: 'border-transparent bg-(--kbd-solid) text-(--kbd-solid-foreground)',
        outline: 'border-(--kbd-color)/40 bg-transparent text-(--kbd-color)',
        soft: 'border-transparent bg-(--kbd-color)/10 text-(--kbd-color)',
        subtle: 'border-(--kbd-color)/20 bg-(--kbd-color)/10 text-(--kbd-color)',
      } satisfies Record<(typeof kbdVariantNames)[number], string>,
    },
    defaultVariants: {
      size: kbdDefaults.size,
      variant: kbdDefaults.variant,
    },
  },
)

export type KbdVariants = VariantProps<typeof kbdVariants>
export type KbdSize = NonNullable<KbdVariants['size']>
export type KbdVariant = NonNullable<KbdVariants['variant']>
export type KbdRadius = string | number

export interface KbdProps {
  label?: string
  size?: KbdSize
  variant?: KbdVariant
  color?: string
  radius?: KbdRadius
}

export interface KbdSlots {
  default?(): unknown
}

export type KbdGroupProps = Record<string, never>

export interface KbdGroupSlots {
  default?(): unknown
}
