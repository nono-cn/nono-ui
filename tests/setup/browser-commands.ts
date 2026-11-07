import { readFile } from 'node:fs/promises'
import type { BrowserCommand } from 'vitest/node'
// Tipos de Playwright en el contexto de los comandos (context.page)
import type {} from '@vitest/browser-playwright'

// Comandos que los tests de navegador ejecutan del lado de Node (import { commands } from 'vitest/browser').

// Cambia el tamaño de la ventana del navegador que contiene la página del test. El navegador
// solo pinta lo que cabe en ella: para capturar una página más alta hay que agrandarla.
const setWindowSize: BrowserCommand<[width: number, height: number]> = async (
  context,
  width,
  height,
) => {
  if (context.provider.name !== 'playwright') throw new Error('setWindowSize requires Playwright')
  await context.page.setViewportSize({ width, height })
}

// Lee una imagen del disco en base64, para que el navegador pueda comparar capturas.
const readImageBase64: BrowserCommand<[path: string]> = async (_context, path) => {
  return (await readFile(path)).toString('base64')
}

export const browserCommands = { setWindowSize, readImageBase64 }

declare module 'vitest/browser' {
  interface BrowserCommands {
    setWindowSize: (width: number, height: number) => Promise<void>
    readImageBase64: (path: string) => Promise<string>
  }
}
