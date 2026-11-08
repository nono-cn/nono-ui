import { defineComponent, type VNodeChild } from 'vue'
import { describe, expect, it } from 'vitest'
import { cdp, commands, page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { browserWindow, defaultViewport, viewports } from '../setup/viewports'
import { describeChanges, type ShowcaseBox } from './changedRows'
import './showcase.css'

interface ShowcaseOptions {
  stories: Record<string, () => VNodeChild>
  mobile?: boolean
}

const themes = [
  { text: 'light', dark: false },
  { text: 'dark', dark: true },
]

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

async function forcePseudoStates(gallery: HTMLElement) {
  if (!gallery.querySelector('[data-showcase-force]')) return

  const id = crypto.randomUUID()
  gallery.dataset.showcaseId = id

  const session = cdp()
  await session.send('DOM.enable')
  await session.send('CSS.enable')
  await session.send('DOM.getDocument', { depth: -1, pierce: true })
  const { searchId, resultCount } = await session.send('DOM.performSearch', {
    query: `[data-showcase-id="${id}"] [data-showcase-force]`,
  })
  const { nodeIds } = await session.send('DOM.getSearchResults', {
    searchId,
    fromIndex: 0,
    toIndex: resultCount,
  })
  await session.send('DOM.discardSearchResults', { searchId })

  for (const nodeId of nodeIds as number[]) {
    const { attributes } = await session.send('DOM.getAttributes', { nodeId })
    const value = (attributes as string[])[
      (attributes as string[]).indexOf('data-showcase-force') + 1
    ]
    await session.send('CSS.forcePseudoState', {
      nodeId,
      forcedPseudoClasses: value!.split(/\s+/).filter(Boolean),
    })
  }
}

export function showcase({ stories, mobile = false }: ShowcaseOptions) {
  const sizes = mobile ? [viewports.desktop, viewports.mobile] : [viewports[defaultViewport]]
  const matrix = themes.flatMap((theme) => sizes.map((viewport) => ({ theme, viewport })))

  const Gallery = defineComponent(() => () => (
    <main data-showcase>
      {Object.entries(stories).map(([title, story]) => (
        <section data-showcase-row={title}>
          <h3>{title}</h3>
          {story()}
        </section>
      ))}
    </main>
  ))

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
          await forcePseudoStates(gallery)

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
