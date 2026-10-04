import { cva, type VariantProps } from 'class-variance-authority'
import type { ToggleProps as RekaToggleProps } from 'reka-ui'
import type { IconName } from '@/components/ui/Icon'
import { toggleDefaults, toggleSizes, toggleVariantNames } from './constants'

export { default as Toggle } from './Toggle.vue'
export {
  toggleDefaults,
  toggleIconSizes,
  toggleSizes,
  toggleTextSizes,
  toggleVariantNames,
} from './constants'

export const toggleVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:border-(--toggle-color) focus-visible:ring-[3px] focus-visible:ring-(--toggle-color)/30 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
  {
    variants: {
      variant: {
        outline:
          'border border-(--toggle-color)/40 bg-transparent text-(--toggle-color) hover:bg-(--toggle-color)/10 data-[state=on]:border-(--toggle-color)/60 data-[state=on]:bg-(--toggle-color)/20',
        plain:
          'bg-transparent text-(--toggle-color) hover:bg-(--toggle-color)/10 data-[state=on]:bg-(--toggle-color)/20',
      } satisfies Record<(typeof toggleVariantNames)[number], string>,
      size: {
        xs: 'h-7 gap-1 px-2.5 text-xs has-[>svg]:px-2',
        sm: 'h-8 gap-1.5 px-3 text-sm has-[>svg]:px-2.5',
        md: 'h-9 px-4 py-2 text-base has-[>svg]:px-3',
        lg: 'h-10 px-6 text-lg has-[>svg]:px-4',
        xl: 'h-11 px-8 text-xl has-[>svg]:px-5',
        'icon-xs': 'size-7 p-0',
        'icon-sm': 'size-8 p-0',
        icon: 'size-9 p-0',
        'icon-lg': 'size-10 p-0',
        'icon-xl': 'size-11 p-0',
      } satisfies Record<(typeof toggleSizes)[number], string>,
    },
    defaultVariants: {
      variant: toggleDefaults.variant,
      size: toggleDefaults.size,
    },
  },
)

export type ToggleVariants = VariantProps<typeof toggleVariants>
export type ToggleVariant = NonNullable<ToggleVariants['variant']>
export type ToggleSize = NonNullable<ToggleVariants['size']>

export type ToggleValue = boolean

export interface ToggleProps extends Pick<RekaToggleProps, 'disabled' | 'name'> {
  modelValue?: ToggleValue
  label?: string
  icon?: IconName
  trailingIcon?: IconName
  variant?: ToggleVariant
  size?: ToggleSize
  color?: string
}

export interface ToggleEmits {
  'update:modelValue': [value: ToggleValue]
}

export interface ToggleContext {
  pressed: boolean
}

export function createToggleContext(value: ToggleValue | undefined): ToggleContext {
  return { pressed: value === true }
}

export interface ToggleSlots {
  default?(props: ToggleContext): unknown
  leading?(props: ToggleContext): unknown
  trailing?(props: ToggleContext): unknown
}
