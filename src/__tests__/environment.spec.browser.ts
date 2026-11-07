import { defineComponent, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { describe, expect, it } from 'vitest'
import { render } from '@test'

// Comprueba que los tests de navegador corren siempre en el mismo entorno (vitest.config.ts),
// para que las capturas no dependan de quién los lance.
describe('Browser environment', () => {
  it('runs in the Linux Chromium from Docker', () => {
    expect(navigator.platform).toBe('Linux x86_64')
  })

  it('uses the desktop viewport (1280x800) by default', () => {
    expect({ width: window.innerWidth, height: window.innerHeight }).toEqual({
      width: 1280,
      height: 800,
    })
  })

  it('uses a device pixel ratio of 1', () => {
    expect(window.devicePixelRatio).toBe(1)
  })

  it('requests reduced motion', () => {
    expect(matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(true)
  })

  it('uses the en-US locale', () => {
    expect(navigator.language).toBe('en-US')
  })

  it('uses the UTC time zone', () => {
    expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toBe('UTC')
  })
})

// Comprueba lo que añade tests/setup/browser.ts a cada test de navegador.
describe('Browser setup', () => {
  it('loads the library styles', () => {
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary')

    expect(primary.trim()).not.toBe('')
  })

  it('disables animations, even inline ones', () => {
    const element = document.createElement('div')
    element.style.animation = 'spin 1s infinite'
    document.body.append(element)

    expect({
      duration: getComputedStyle(element).animationDuration,
      iterations: getComputedStyle(element).animationIterationCount,
    }).toEqual({ duration: '0s', iterations: '1' })

    element.remove()
  })

  it('disables transitions, even inline ones', () => {
    const element = document.createElement('div')
    element.style.transition = 'color 1s 1s'
    document.body.append(element)

    expect({
      duration: getComputedStyle(element).transitionDuration,
      delay: getComputedStyle(element).transitionDelay,
    }).toEqual({ duration: '0s', delay: '0s' })

    element.remove()
  })

  it('render mounts components with i18n in English', async () => {
    const Translated = defineComponent(() => {
      const { t } = useI18n()
      return () => h('span', t('close'))
    })

    const screen = await render(Translated)

    await expect.element(screen.getByText('Close')).toBeInTheDocument()
  })
})
