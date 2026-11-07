import type { BrowserCommand } from 'vitest/node'

// Comandos que los tests de navegador ejecutan del lado de Node (import { commands } from 'vitest/browser').

// Cambia el tamaño de la ventana del navegador que contiene la página del test. El navegador
// solo pinta lo que cabe en ella: para capturar una página más alta hay que agrandarla.
const setWindowSize: BrowserCommand<[width: number, height: number]> = async (
  context,
  width,
  height,
) => {
  if (context.provider.name !== 'playwright') throw new Error('setWindowSize requiere Playwright')
  await context.page.setViewportSize({ width, height })
}

export const browserCommands = { setWindowSize }

declare module 'vitest/browser' {
  interface BrowserCommands {
    setWindowSize: (width: number, height: number) => Promise<void>
  }
}
