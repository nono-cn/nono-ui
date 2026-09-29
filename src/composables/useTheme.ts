import { computed, toValue, type CSSProperties, type MaybeRefOrGetter } from 'vue'
import { getContrastColor } from './useColor'

interface ThemeOptions {
  color: MaybeRefOrGetter<string | undefined>
  radius: MaybeRefOrGetter<string | undefined>
  shadow: MaybeRefOrGetter<string | undefined>
  prefix: string
  defaultColor: string
  defaultRadius: string
  defaultShadow: string
}

export function useTheme({
  color,
  radius,
  shadow,
  prefix,
  defaultColor,
  defaultRadius,
  defaultShadow,
}: ThemeOptions) {
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

  const radiusStyle = computed<CSSProperties>(() => {
    const value = (toValue(radius) || defaultRadius).trim()
    const token = /^(?:[a-z][\w-]*|\d+xl)$/i.test(value)

    return {
      [`--${prefix}-radius`]: token
        ? `var(--radius-${value}, var(--radius-${defaultRadius}))`
        : value,
    } as CSSProperties
  })

  const shadowStyle = computed<CSSProperties>(() => {
    const value = (toValue(shadow) || defaultShadow).trim()
    const token = /^(?:[a-z][\w-]*|\d+xl)$/.test(value)

    return {
      [`--${prefix}-shadow`]: token
        ? `var(--shadow-${value}, var(--shadow-${defaultShadow}))`
        : value,
    } as CSSProperties
  })

  return { colorStyle, radiusStyle, shadowStyle }
}
