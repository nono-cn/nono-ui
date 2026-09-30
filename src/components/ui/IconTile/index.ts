import { cva, type VariantProps } from 'class-variance-authority'
import type { IconName } from '@/components/ui/Icon'
import { iconTileShapes, iconTileSizes, iconTileVariantNames } from './constants'

export { default as IconTile } from './IconTile.vue'
export { iconTileShapes, iconTileSizes, iconTileVariantNames } from './constants'

export const iconTileVariants = cva('relative inline-flex shrink-0 items-center justify-center', {
  variants: {
    variant: {
      outline: 'border border-(--icon-tile-color)/40 bg-transparent text-(--icon-tile-color)',
      elevated:
        'border border-(--icon-tile-color)/10 bg-background text-(--icon-tile-color) shadow-sm ring-1 ring-(--icon-tile-color)/5',
      soft: 'border border-(--icon-tile-color)/20 bg-(--icon-tile-color)/10 text-(--icon-tile-color)',
      solid: 'border-transparent bg-(--icon-tile-solid) text-(--icon-tile-solid-foreground)',
      frame:
        'border border-(--icon-tile-color)/40 bg-(--icon-tile-color)/10 p-1 text-(--icon-tile-color) before:absolute before:inset-1 before:rounded-[inherit] before:border before:border-(--icon-tile-color)/40 before:bg-(--icon-tile-color)/5',
    } satisfies Record<(typeof iconTileVariantNames)[number], string>,
    size: {
      xs: 'size-6 [&>svg]:size-3',
      sm: 'size-8 [&>svg]:size-4',
      md: 'size-10 [&>svg]:size-5',
      lg: 'size-12 [&>svg]:size-6',
      xl: 'size-16 [&>svg]:size-8',
    } satisfies Record<(typeof iconTileSizes)[number], string>,
    shape: {
      rounded: 'rounded-lg',
      full: 'rounded-full',
    } satisfies Record<(typeof iconTileShapes)[number], string>,
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
    shape: 'rounded',
  },
})

export type IconTileVariants = VariantProps<typeof iconTileVariants>
export type IconTileVariant = NonNullable<IconTileVariants['variant']>
export type IconTileSize = NonNullable<IconTileVariants['size']>
export type IconTileShape = NonNullable<IconTileVariants['shape']>

export interface IconTileProps {
  icon: IconName
  variant?: IconTileVariant
  size?: IconTileSize
  shape?: IconTileShape
  color?: string
}
