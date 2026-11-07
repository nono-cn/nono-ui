import { defineComponent, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { describe, expect, it } from 'vitest'
import { render } from '@test'

// Comprueba que los tests de navegador corren siempre en el mismo entorno (vitest.config.ts),
// para que las capturas no dependan de quién los lance.
describe('Entorno del navegador', () => {
  it('se ejecuta en el Chromium Linux de Docker', () => {
    expect(navigator.platform).toBe('Linux x86_64')
  })

  it('usa por defecto el viewport de escritorio (1280x800)', () => {
    expect({ width: window.innerWidth, height: window.innerHeight }).toEqual({
      width: 1280,
      height: 800,
    })
  })

  it('usa una densidad de píxeles de 1', () => {
    expect(window.devicePixelRatio).toBe(1)
  })

  it('pide animaciones reducidas', () => {
    expect(matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(true)
  })

  it('usa el idioma en-US', () => {
    expect(navigator.language).toBe('en-US')
  })

  it('usa la zona horaria UTC', () => {
    expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toBe('UTC')
  })
})

// Comprueba lo que añade tests/setup/browser.ts a cada test de navegador.
describe('Setup del navegador', () => {
  it('carga los estilos de la librería', () => {
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary')

    expect(primary.trim()).not.toBe('')
  })

  it('anula las animaciones, incluso las inline', () => {
    const element = document.createElement('div')
    element.style.animation = 'spin 1s infinite'
    document.body.append(element)

    expect({
      duration: getComputedStyle(element).animationDuration,
      iterations: getComputedStyle(element).animationIterationCount,
    }).toEqual({ duration: '0s', iterations: '1' })

    element.remove()
  })

  it('anula las transiciones, incluso las inline', () => {
    const element = document.createElement('div')
    element.style.transition = 'color 1s 1s'
    document.body.append(element)

    expect({
      duration: getComputedStyle(element).transitionDuration,
      delay: getComputedStyle(element).transitionDelay,
    }).toEqual({ duration: '0s', delay: '0s' })

    element.remove()
  })

  it('render monta los componentes con i18n en inglés', async () => {
    const Translated = defineComponent(() => {
      const { t } = useI18n()
      return () => h('span', t('close'))
    })

    const screen = await render(Translated)

    await expect.element(screen.getByText('Close')).toBeInTheDocument()
  })
})
