// Tamaños de pantalla de los tests de navegador. Única fuente: los usan vitest.config.ts,
// showcase y el test de entorno.
export const viewports = {
  desktop: { text: 'desktop', width: 1280, height: 800 },
  mobile: { text: 'mobile', width: 390, height: 844 },
} as const

export type ViewportName = keyof typeof viewports

export const defaultViewport: ViewportName = 'desktop'

// Ventana del navegador que contiene la página del test. Tiene que ser mayor que cualquier
// viewport: si no, Vitest encoge la página para que quepa y las capturas salen reducidas.
export const browserWindow = { width: 1920, height: 1080 } as const
