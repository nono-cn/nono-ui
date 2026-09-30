import { cva, type VariantProps } from 'class-variance-authority'
import type { IconName } from '@/components/ui/Icon'
import { iconTileSizes, iconTileVariantNames } from './constants'

export { default as IconTile } from './IconTile.vue'
export { iconTileSizes, iconTileVariantNames } from './constants'

export const iconTileVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center rounded-(--icon-tile-radius)',
  {
    variants: {
      variant: {
        outline: 'border border-(--icon-tile-color)/40 bg-transparent text-(--icon-tile-color)',
        elevated:
          'border border-border bg-muted text-(--icon-tile-color) shadow-sm ring-2 ring-background',
        soft: 'border border-(--icon-tile-color)/20 bg-(--icon-tile-color)/10 text-(--icon-tile-color)',
        solid: 'border-transparent bg-(--icon-tile-solid) text-(--icon-tile-solid-foreground)',
        frame:
          'border border-border bg-muted p-1 text-(--icon-tile-color) shadow-sm before:absolute before:inset-1 before:rounded-[inherit] before:border before:border-border before:bg-background',
      } satisfies Record<(typeof iconTileVariantNames)[number], string>,
      size: {
        xs: 'size-6 [&>svg]:size-3',
        sm: 'size-8 [&>svg]:size-4',
        md: 'size-10 [&>svg]:size-5',
        lg: 'size-12 [&>svg]:size-6',
        xl: 'size-16 [&>svg]:size-8',
      } satisfies Record<(typeof iconTileSizes)[number], string>,
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
    },
  },
)

export type IconTileVariants = VariantProps<typeof iconTileVariants>
export type IconTileVariant = NonNullable<IconTileVariants['variant']>
export type IconTileSize = NonNullable<IconTileVariants['size']>
export type IconTileRadius = string | number

export interface IconTileProps {
  icon: IconName
  variant?: IconTileVariant
  size?: IconTileSize
  radius?: IconTileRadius
  color?: string
}
