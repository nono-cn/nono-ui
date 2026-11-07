import { defineComponent, h, type Component, type VNodeChild } from 'vue'
import { describe, expect, it } from 'vitest'
import { commands, page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import '../setup/browser-commands'
import { browserWindow, viewports } from '../setup/viewports'
import './showcase.css'

// Como el showcase de Vuetify (packages/vuetify/test/templates/generateStories.tsx):
// genera una página con todas las variantes del componente y la captura entera en claro y
// oscuro, en escritorio y móvil: 4 capturas por componente.
//
// Referencias (en git): __tests__/__screenshots__/<test>/<tema>-<tamaño>-chromium.png

/** Ejemplos escritos a mano: el título y lo que se pinta. */
type Stories = Record<string, () => VNodeChild>

/** Por cada prop, sus valores: cada uno es una variante. Un booleano pinta true y false. */
type Props = Record<string, boolean | readonly unknown[]>

interface ShowcaseOptions {
  component?: Component
  /** Props comunes a todas las variantes (p. ej. las obligatorias). */
  base?: Record<string, unknown>
  props?: Props
  stories?: Stories
}

interface ShowcaseRow {
  title: string
  variants: { label: string; render: () => VNodeChild }[]
}

const themes = [
  { text: 'claro', dark: false },
  { text: 'oscuro', dark: true },
]

const matrix = themes.flatMap((theme) =>
  Object.values(viewports).map((viewport) => ({ theme, viewport })),
)

function rowsFromProps(component: Component, base: Record<string, unknown>, props: Props) {
  return Object.entries(props).map<ShowcaseRow>(([key, value]) => {
    const values = typeof value === 'boolean' ? [true, false] : value

    return {
      title: key,
      variants: values.map((v) => ({
        label: String(v),
        render: () => h(component, { ...base, [key]: v }),
      })),
    }
  })
}

function rowsFromStories(stories: Stories) {
  return Object.entries(stories).map<ShowcaseRow>(([title, render]) => ({
    title,
    variants: [{ label: '', render }],
  }))
}

function section(title: string, rows: ShowcaseRow[]) {
  if (!rows.length) return null

  return h('section', [
    h('h2', title),
    ...rows.map((row) =>
      h('div', { 'data-showcase-row': '' }, [
        h('h3', row.title),
        h(
          'div',
          { 'data-showcase-variants': '' },
          row.variants.map((variant) =>
            h('figure', [variant.render(), variant.label && h('figcaption', variant.label)]),
          ),
        ),
      ]),
    ),
  ])
}

export function showcase({ component, base = {}, props, stories }: ShowcaseOptions) {
  if (props && !component) throw new Error('showcase: props necesita component')

  const storyRows = stories ? rowsFromStories(stories) : []
  const propRows = props && component ? rowsFromProps(component, base, props) : []

  const Gallery = defineComponent(
    () => () =>
      h('main', { 'data-showcase': '' }, [
        section('Stories', storyRows),
        section('Props', propRows),
      ]),
  )

  describe('Showcase', () => {
    it.each(matrix)(
      'en tema $theme.text y $viewport.text se ve igual que su captura de referencia',
      async ({ theme, viewport }) => {
        await page.viewport(viewport.width, viewport.height)
        document.documentElement.classList.toggle('dark', theme.dark)

        try {
          const screen = await render(Gallery)
          await document.fonts.ready

          // El navegador solo pinta lo que cabe en su ventana: se agrandan ventana y página
          // al alto de la galería para capturarla entera.
          const gallery = screen.container.querySelector<HTMLElement>('[data-showcase]')!
          const height = Math.ceil(gallery.getBoundingClientRect().bottom + window.scrollY)
          await commands.setWindowSize(
            Math.max(browserWindow.width, viewport.width),
            Math.max(browserWindow.height, height),
          )
          await page.viewport(viewport.width, Math.max(viewport.height, height))

          await expect
            .element(page.elementLocator(gallery))
            .toMatchScreenshot(`${theme.text}-${viewport.text}`)
        } finally {
          document.documentElement.classList.remove('dark')
          await commands.setWindowSize(browserWindow.width, browserWindow.height)
          const { width, height } = viewports.desktop
          await page.viewport(width, height)
        }
      },
    )
  })
}
