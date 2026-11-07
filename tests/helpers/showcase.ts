import { defineComponent, h, type Component, type VNodeChild } from 'vue'
import { describe, expect, it } from 'vitest'
import { commands, page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { browserWindow, defaultViewport, viewports } from '../setup/viewports'
import { describeChanges, type ShowcaseBox } from './changedRows'
import './showcase.css'

type Stories = Record<string, () => VNodeChild>

type Props = Record<string, boolean | readonly unknown[]>

type Slots = Record<string, () => VNodeChild>

interface ShowcaseOptions {
  component?: Component
  /** Props comunes a todas las variantes (p. ej. las obligatorias). */
  base?: Record<string, unknown>
  /** Slots comunes a todas las variantes de `props` (p. ej. el contenido sobre el que se pinta). */
  slots?: Slots
  props?: Props
  stories?: Stories
  mobile?: boolean
}

interface ShowcaseRow {
  title: string
  variants: { label: string; render: () => VNodeChild }[]
}

const themes = [
  { text: 'light', dark: false },
  { text: 'dark', dark: true },
]

function rowsFromProps(
  component: Component,
  base: Record<string, unknown>,
  slots: Slots | undefined,
  props: Props,
) {
  return Object.entries(props).map<ShowcaseRow>(([key, value]) => {
    const values = typeof value === 'boolean' ? [true, false] : value

    return {
      title: key,
      variants: values.map((v) => ({
        label: String(v),
        render: () => h(component, { ...base, [key]: v }, slots),
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
      h('div', { 'data-showcase-row': `${title} > ${row.title}` }, [
        h('h3', row.title),
        h(
          'div',
          { 'data-showcase-variants': '' },
          row.variants.map((variant) =>
            h('figure', { 'data-showcase-part': variant.label || undefined }, [
              variant.render(),
              variant.label && h('figcaption', variant.label),
            ]),
          ),
        ),
      ]),
    ),
  ])
}

// Posición de cada fila y de sus variantes dentro de la captura (relativa a la galería).
function showcaseBoxes(gallery: HTMLElement) {
  const origin = gallery.getBoundingClientRect()
  const box = (element: HTMLElement, title: string, parts: ShowcaseBox[] = []): ShowcaseBox => {
    const rect = element.getBoundingClientRect()

    return {
      title,
      top: Math.floor(rect.top - origin.top),
      bottom: Math.ceil(rect.bottom - origin.top),
      left: Math.floor(rect.left - origin.left),
      right: Math.ceil(rect.right - origin.left),
      parts,
    }
  }

  return [...gallery.querySelectorAll<HTMLElement>('[data-showcase-row]')].map((row) =>
    box(
      row,
      row.dataset.showcaseRow!,
      [...row.querySelectorAll<HTMLElement>('[data-showcase-part]')].map((part) =>
        box(part, part.dataset.showcasePart!),
      ),
    ),
  )
}

export function showcase({
  component,
  base = {},
  slots,
  props,
  stories,
  mobile = false,
}: ShowcaseOptions) {
  if (props && !component) throw new Error('showcase: props requires component')

  const sizes = mobile ? [viewports.desktop, viewports.mobile] : [viewports[defaultViewport]]
  const matrix = themes.flatMap((theme) => sizes.map((viewport) => ({ theme, viewport })))

  const storyRows = stories ? rowsFromStories(stories) : []
  const propRows = props && component ? rowsFromProps(component, base, slots, props) : []

  const Gallery = defineComponent(
    () => () =>
      h('main', { 'data-showcase': '' }, [
        section('Stories', storyRows),
        section('Props', propRows),
      ]),
  )

  describe('Showcase', () => {
    it.each(matrix)(
      'matches its reference screenshot in $theme.text theme on $viewport.text',
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

          try {
            await expect
              .element(page.elementLocator(gallery))
              .toMatchScreenshot(`${theme.text}-${viewport.text}`)
          } catch (error) {
            await describeChanges(error, showcaseBoxes(gallery))
            throw error
          }
        } finally {
          document.documentElement.classList.remove('dark')
          await commands.setWindowSize(browserWindow.width, browserWindow.height)
          const { width, height } = viewports[defaultViewport]
          await page.viewport(width, height)
        }
      },
    )
  })
}
