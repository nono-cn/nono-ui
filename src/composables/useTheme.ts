import { computed, toValue, type CSSProperties, type MaybeRefOrGetter } from 'vue'
import { getContrastColor } from './useColor'

interface ThemeOptions {
  color: MaybeRefOrGetter<string | undefined>
  prefix: string
  defaultColor: string
  radius?: MaybeRefOrGetter<string | number | undefined>
  defaultRadius?: string | number
}

function resolveRadius(value: string | number): string {
  const text = String(value).trim()

  if (typeof value === 'number' || /^-?(?:\d+\.?\d*|\.\d+)$/.test(text)) return `${text}px`
  if (text === 'none') return '0'
  if (text === 'full') return '9999px'
  if (text === 'sm') return 'var(--radius-sm, 0.25rem)'
  if (/^(?:inherit|initial|unset|revert|revert-layer)$/i.test(text)) return text
  if (/^(?:[a-z][\w-]*|\d+xl)$/i.test(text)) return `var(--radius-${text})`

  return text
}

export function useTheme({ color, prefix, defaultColor, radius, defaultRadius }: ThemeOptions) {
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
    if (!defaultRadius) return {}

    const input = toValue(radius)
    const value = input === undefined || input === '' ? defaultRadius : input
    return { [`--${prefix}-radius`]: resolveRadius(value) } as CSSProperties
  })

  return { colorStyle, radiusStyle }
}
