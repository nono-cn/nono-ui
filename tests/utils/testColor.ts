import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

interface TestColorOptions {
  text: string
  id: string
  varColor: string
  mount: (color: string | undefined) => VueWrapper
  defaultColor?: string
  fallbackColor?: string
  theme?: {
    colors: readonly string[]
    foregroundVar: string
    solidVar: string
    solidForegroundVar: string
  }
}

export function testColor({
  text,
  id,
  varColor,
  mount,
  defaultColor,
  fallbackColor = 'primary',
  theme,
}: TestColorOptions) {
  it.each([
    { input: '#ff0000', expected: `${varColor}: #ff0000` },
    { input: undefined, expected: defaultColor && `${varColor}: ${defaultColor}` },
  ])(`${text} input=$input`, ({ input, expected }) => {
    const root = mount(input).get(id)

    if (expected) expect(root.attributes('style')).toContain(expected)
    else expect(root.attributes('style') ?? '').not.toContain(varColor)
  })

  if (theme) {
    it.each([theme.colors[0] ?? fallbackColor, 'mi-marca'])(
      `${text} resuelve el token %s y su foreground`,
      (color) => {
        const style = mount(color).get(id).attributes('style')
        const base = `var(--${color}, var(--${fallbackColor}))`
        const foreground = `var(--${color}-foreground, var(--${fallbackColor}-foreground))`

        expect(style).toContain(`${varColor}: ${base}`)
        expect(style).toContain(`${theme.solidVar}: ${base}`)
        expect(style).toContain(`${theme.foregroundVar}: ${foreground}`)
        expect(style).toContain(`${theme.solidForegroundVar}: ${foreground}`)
      },
    )

    it.each([
      { color: '#ffffff', foreground: '#09090b' },
      { color: '#000000', foreground: '#ffffff' },
    ])(`${text} usa hexadecimal $color con foreground $foreground`, ({ color, foreground }) => {
      const style = mount(color).get(id).attributes('style')

      expect(style).toContain(`${varColor}: ${color}`)
      expect(style).toContain(`${theme.solidVar}: ${color}`)
      expect(style).toContain(`${theme.foregroundVar}: ${foreground}`)
      expect(style).toContain(`${theme.solidForegroundVar}: ${foreground}`)
    })
  }
}
