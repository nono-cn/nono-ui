import { computed, toValue, type CSSProperties, type MaybeRefOrGetter } from 'vue'
import { getContrastColor } from './useColor'

interface ThemeOptions {
  color: MaybeRefOrGetter<string | undefined>
  prefix: string
  defaultColor: string
}

export function useTheme({ color, prefix, defaultColor }: ThemeOptions) {
  const colorStyle = computed<CSSProperties>(() => {
    const value = (toValue(color) || defaultColor).trim()
    const palette = /^[a-z][\w-]*$/i.test(value)
    const base = palette ? `var(--${value}, var(--${defaultColor}))` : value
    const foreground = palette
      ? `var(--${value}-foreground, var(--${defaultColor}-foreground))`
      : getContrastColor(value)

    return {
      [`--${prefix}-color`]: base,
      [`--${prefix}-color-foreground`]: foreground,
      [`--${prefix}-solid`]: base,
      [`--${prefix}-solid-foreground`]: foreground,
    } as CSSProperties
  })

  return { colorStyle }
}
