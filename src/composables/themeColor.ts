import type { CSSProperties } from 'vue'
import { getContrastColor } from './useColor'

export function getThemeColorStyle(
  value: string | undefined,
  prefix: string,
  defaultColor: string,
): CSSProperties {
  const color = (value || defaultColor).trim()
  const palette = /^[a-z][\w-]*$/i.test(color)
  const base = palette ? `var(--${color}, var(--${defaultColor}))` : color
  const foreground = palette
    ? `var(--${color}-foreground, var(--${defaultColor}-foreground))`
    : getContrastColor(color)

  return {
    [`--${prefix}-color`]: base,
    [`--${prefix}-color-foreground`]: foreground,
    [`--${prefix}-solid`]: base,
    [`--${prefix}-solid-foreground`]: foreground,
  } as CSSProperties
}
