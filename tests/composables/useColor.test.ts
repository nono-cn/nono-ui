import { ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { getContrastColor, useColor } from '@/composables/useColor'

describe('getContrastColor', () => {
  it.each([
    ['#000000', '#ffffff'],
    ['#fff', '#09090b'],
    ['rgb(255, 0, 0)', '#09090b'],
    ['rgba(0, 0, 255, 0.5)', '#ffffff'],
  ])('elige el color con mayor contraste para %s', (color, expected) => {
    expect(getContrastColor(color)).toBe(expected)
  })

  it('permite personalizar los colores de contraste', () => {
    expect(getContrastColor('#000000', 'white', 'black')).toBe('white')
    expect(getContrastColor('#ffffff', 'white', 'black')).toBe('black')
  })

  it('usa el color claro cuando no puede resolver el color recibido', () => {
    expect(getContrastColor('color-invalido')).toBe('#ffffff')
  })
})

describe('useColor', () => {
  it('genera las variables con el prefijo indicado', () => {
    const { contrastColor, colorStyle } = useColor('#ffffff', 'badge')

    expect(contrastColor.value).toBe('#09090b')
    expect(colorStyle.value).toEqual({
      '--badge-color': '#ffffff',
      '--badge-color-foreground': '#09090b',
    })
  })

  it('no genera estilos cuando no hay color', () => {
    const { contrastColor, colorStyle } = useColor(undefined)

    expect(contrastColor.value).toBeUndefined()
    expect(colorStyle.value).toBeUndefined()
  })

  it('actualiza el contraste y los estilos de forma reactiva', () => {
    const color = ref<string>()
    const { contrastColor, colorStyle } = useColor(color)

    color.value = '#000000'
    expect(contrastColor.value).toBe('#ffffff')
    expect(colorStyle.value).toEqual({
      '--button-color': '#000000',
      '--button-color-foreground': '#ffffff',
    })

    color.value = '#ffffff'
    expect(contrastColor.value).toBe('#09090b')
    expect(colorStyle.value).toEqual({
      '--button-color': '#ffffff',
      '--button-color-foreground': '#09090b',
    })
  })
})
