// Antes de lanzar el proyecto browser, espera a que el Chromium de Docker esté listo, para
// avisar con un mensaje claro en vez de un timeout de Playwright.
//
// No basta con que el puerto acepte conexiones: Docker lo abre en cuanto arranca el
// contenedor, antes de que el servidor de Playwright escuche dentro. Por eso se espera a una
// respuesta HTTP real.
const timeoutMs = 30_000
const retryMs = 500

async function isReady(url: string) {
  try {
    await fetch(url, { signal: AbortSignal.timeout(2000) })
    return true
  } catch {
    return false
  }
}

export default async function waitForBrowserServer() {
  const endpoint = new URL(process.env.BROWSER_WS_ENDPOINT ?? 'ws://127.0.0.1:6677/')
  const url = `http://${endpoint.host}/`
  const deadline = Date.now() + timeoutMs

  while (Date.now() < deadline) {
    if (await isReady(url)) return
    await new Promise((resolve) => setTimeout(resolve, retryMs))
  }

  throw new Error(
    `No hay navegador en ${endpoint.href}. Abre Docker Desktop y ejecuta: npm run browser:up`,
  )
}
