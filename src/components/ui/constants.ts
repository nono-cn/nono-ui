export const themeColors = [
  'primary',
  'neutral',
  'secondary',
  'warning',
  'success',
  'error',
] as const

// paths del arrow de reka (viewBox 0 0 12 6), abiertos para que el stroke no pinte la base
export const arrowPaths = {
  sharp: 'M0 0L6 6L12 0',
  rounded: 'M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0',
}
