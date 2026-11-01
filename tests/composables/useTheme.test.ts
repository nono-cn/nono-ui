import { ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { getThemeColorStyle, useTheme } from '@/composables/useTheme'

describe('getThemeColorStyle', () => {
  it('con un token de tema define el color con ese token y el de por defecto como respaldo', () => {
    const style = getThemeColorStyle('error', 'badge', 'primary')

    expect(style).toMatchObject({ '--badge-color': 'var(--error, var(--primary))' })
  })

  it('con un token de tema define el foreground con el foreground del token', () => {
    const style = getThemeColorStyle('error', 'badge', 'primary')

    expect(style).toMatchObject({
      '--badge-color-foreground': 'var(--error-foreground, var(--primary-foreground))',
    })
  })

  it('con un color CSS define el color con ese color', () => {
    const style = getThemeColorStyle('#ff0000', 'badge', 'primary')

    expect(style).toMatchObject({ '--badge-color': '#ff0000' })
  })

  it('con un color CSS oscuro usa un foreground claro', () => {
    const style = getThemeColorStyle('#000000', 'badge', 'primary')

    expect(style).toMatchObject({ '--badge-color-foreground': '#ffffff' })
  })

  it('con un color CSS claro usa un foreground oscuro', () => {
    const style = getThemeColorStyle('#ffffff', 'badge', 'primary')

    expect(style).toMatchObject({ '--badge-color-foreground': '#09090b' })
  })

  it('sin color usa el color por defecto', () => {
    const style = getThemeColorStyle(undefined, 'badge', 'primary')

    expect(style).toMatchObject({ '--badge-color': 'var(--primary, var(--primary))' })
  })

  it('con un color vacío usa el color por defecto', () => {
    const style = getThemeColorStyle('', 'badge', 'primary')

    expect(style).toMatchObject({ '--badge-color': 'var(--primary, var(--primary))' })
  })

  it('ignora los espacios alrededor del color', () => {
    const style = getThemeColorStyle('  error  ', 'badge', 'primary')

    expect(style).toMatchObject({ '--badge-color': 'var(--error, var(--primary))' })
  })

  it('el solid es el mismo que el color', () => {
    const style = getThemeColorStyle('error', 'badge', 'primary')

    expect(style).toMatchObject({ '--badge-solid': 'var(--error, var(--primary))' })
  })

  it('el solid-foreground es el mismo que el foreground', () => {
    const style = getThemeColorStyle('error', 'badge', 'primary')

    expect(style).toMatchObject({
      '--badge-solid-foreground': 'var(--error-foreground, var(--primary-foreground))',
    })
  })
})

describe('useTheme', () => {
  describe('colorStyle', () => {
    it('resuelve el color con el prefijo indicado', () => {
      const { colorStyle } = useTheme({ color: 'error', prefix: 'kbd', defaultColor: 'neutral' })

      expect(colorStyle.value).toMatchObject({ '--kbd-color': 'var(--error, var(--neutral))' })
    })

    it('se actualiza cuando cambia el color', () => {
      const color = ref<string>('error')
      const { colorStyle } = useTheme({ color, prefix: 'kbd', defaultColor: 'neutral' })

      color.value = '#ff0000'

      expect(colorStyle.value).toMatchObject({ '--kbd-color': '#ff0000' })
    })
  })

  describe('radiusStyle', () => {
    it('sin defaultRadius no define el radio', () => {
      const { radiusStyle } = useTheme({
        color: undefined,
        prefix: 'kbd',
        defaultColor: 'neutral',
        radius: 'lg',
      })

      expect(radiusStyle.value).toEqual({})
    })

    it('sin radius usa defaultRadius', () => {
      const { radiusStyle } = useTheme({
        color: undefined,
        prefix: 'kbd',
        defaultColor: 'neutral',
        defaultRadius: 'sm',
      })

      expect(radiusStyle.value).toEqual({ '--kbd-radius': 'var(--radius-sm, 0.25rem)' })
    })

    it('con un radius vacío usa defaultRadius', () => {
      const { radiusStyle } = useTheme({
        color: undefined,
        prefix: 'kbd',
        defaultColor: 'neutral',
        radius: '',
        defaultRadius: 'sm',
      })

      expect(radiusStyle.value).toEqual({ '--kbd-radius': 'var(--radius-sm, 0.25rem)' })
    })

    it('con un número usa píxeles', () => {
      const { radiusStyle } = useTheme({
        color: undefined,
        prefix: 'kbd',
        defaultColor: 'neutral',
        radius: 6,
        defaultRadius: 'sm',
      })

      expect(radiusStyle.value).toEqual({ '--kbd-radius': '6px' })
    })

    it('con un número escrito como texto usa píxeles', () => {
      const { radiusStyle } = useTheme({
        color: undefined,
        prefix: 'kbd',
        defaultColor: 'neutral',
        radius: '6',
        defaultRadius: 'sm',
      })

      expect(radiusStyle.value).toEqual({ '--kbd-radius': '6px' })
    })

    it('con none no redondea', () => {
      const { radiusStyle } = useTheme({
        color: undefined,
        prefix: 'kbd',
        defaultColor: 'neutral',
        radius: 'none',
        defaultRadius: 'sm',
      })

      expect(radiusStyle.value).toEqual({ '--kbd-radius': '0' })
    })

    it('con full redondea del todo', () => {
      const { radiusStyle } = useTheme({
        color: undefined,
        prefix: 'kbd',
        defaultColor: 'neutral',
        radius: 'full',
        defaultRadius: 'sm',
      })

      expect(radiusStyle.value).toEqual({ '--kbd-radius': '9999px' })
    })

    it('con un token de radio usa su variable del tema', () => {
      const { radiusStyle } = useTheme({
        color: undefined,
        prefix: 'kbd',
        defaultColor: 'neutral',
        radius: '2xl',
        defaultRadius: 'sm',
      })

      expect(radiusStyle.value).toEqual({ '--kbd-radius': 'var(--radius-2xl)' })
    })

    it('con una palabra clave de CSS la deja tal cual', () => {
      const { radiusStyle } = useTheme({
        color: undefined,
        prefix: 'kbd',
        defaultColor: 'neutral',
        radius: 'inherit',
        defaultRadius: 'sm',
      })

      expect(radiusStyle.value).toEqual({ '--kbd-radius': 'inherit' })
    })

    it('con una medida CSS la deja tal cual', () => {
      const { radiusStyle } = useTheme({
        color: undefined,
        prefix: 'kbd',
        defaultColor: 'neutral',
        radius: '0.75rem',
        defaultRadius: 'sm',
      })

      expect(radiusStyle.value).toEqual({ '--kbd-radius': '0.75rem' })
    })
  })
})
