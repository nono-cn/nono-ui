import { cva, type VariantProps } from 'class-variance-authority'
import type { IconName } from '@/components/ui/Icon'
import { markerDefaults, markerVariantNames } from './constants'

export { default as Marker } from './Marker.vue'
export { markerDefaults, markerVariantNames } from './constants'

export const markerVariants = cva('flex w-full items-center gap-2 text-sm text-muted-foreground', {
  variants: {
    variant: {
      default: '',
      border: 'border-b py-3',
      separator:
        'gap-2 py-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border',
    } satisfies Record<(typeof markerVariantNames)[number], string>,
    shimmer: { true: 'animate-pulse', false: '' },
  },
  defaultVariants: { variant: markerDefaults.variant, shimmer: markerDefaults.shimmer },
})

export type MarkerVariant = NonNullable<VariantProps<typeof markerVariants>['variant']>

export interface MarkerProps {
  variant?: MarkerVariant
  icon?: IconName
  label?: string
  status?: boolean
  shimmer?: boolean
}

export interface MarkerSlots {
  default?(): unknown
  icon?(): unknown
}
