import type { RibbonItem } from '.'

export const ribbonPositions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const

export const ribbonRotations = {
  'top-right': 45,
  'top-left': -45,
  'bottom-right': -45,
  'bottom-left': 45,
} as const

export const ribbonDefaults = {
  ribbons: () => [] as RibbonItem[],
  ui: undefined,
}

export const ribbonItemDefaults = {
  color: 'primary',
  position: 'top-right' as const,
  // cada banda suma su índice para que las siguientes queden encima
  zIndex: 20,
}
