import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import { browserCommands } from './tests/setup/browser-commands'
import { browserWindow, defaultViewport, viewports } from './tests/setup/viewports'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Chromium de docker-compose.yml (docker compose up -d playwright)
const browserWsEndpoint = process.env.BROWSER_WS_ENDPOINT ?? 'ws://127.0.0.1:6677/'

// tamaño de pantalla por defecto de los tests de navegador (tests/setup/viewports.ts)
const browserViewport = viewports[defaultViewport]

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
      '@test': path.resolve(dirname, 'tests/index.ts'),
    },
  },
  test: {
    // no corta los $text de it.each ni los valores en los mensajes de error
    chaiConfig: { truncateThreshold: 0 },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,vue}'],
      exclude: ['src/main.ts', 'src/App.vue', 'src/**/index.ts', 'src/**/__tests__/**'],
    },
    projects: [
      {
        // lógica sin pantalla: composables, lib…
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['./tests/setup/jsdom.ts'],
          include: ['src/**/__tests__/*.spec.ts'],
          passWithNoTests: true, // aún no hay tests unitarios: que no falle la ejecución por eso
        },
      },
      {
        // componentes: comportamiento y capturas en el Chromium de Docker
        extends: true,
        plugins: [tailwindcss()],
        // evita que Vite recargue a mitad de ejecución al descubrir dependencias
        optimizeDeps: {
          include: [
            '@internationalized/date',
            '@lucide/vue',
            '@vue/shared',
            '@vueuse/core',
            'class-variance-authority',
            'clsx',
            'reka-ui',
            'tailwind-merge',
            'vitest-browser-vue',
            'vue',
            'vue-i18n',
            'vue-router',
          ],
        },
        test: {
          name: 'browser',
          include: ['src/**/__tests__/*.spec.browser.ts'],
          globalSetup: ['./tests/setup/browser-server.ts'],
          setupFiles: ['./tests/setup/browser.ts'],
          browser: {
            enabled: true,
            headless: true,
            commands: browserCommands,
            instances: [{ browser: 'chromium' }],
            viewport: { width: browserViewport.width, height: browserViewport.height },
            // Sin el sistema en el nombre: Vitest pondría el de quien lanza los tests (win32,
            // linux…), pero siempre renderiza el mismo Chromium Linux de Docker.
            expect: {
              toMatchScreenshot: {
                resolveScreenshotPath: ({
                  root,
                  testFileDirectory,
                  screenshotDirectory,
                  testFileName,
                  arg,
                  browserName,
                  ext,
                }) =>
                  `${root}/${testFileDirectory}/${screenshotDirectory}/${testFileName}/${arg}-${browserName}${ext}`,
                resolveDiffPath: ({
                  root,
                  attachmentsDir,
                  testFileDirectory,
                  testFileName,
                  arg,
                  browserName,
                  ext,
                }) =>
                  `${root}/${attachmentsDir}/${testFileDirectory}/${testFileName}/${arg}-${browserName}${ext}`,
              },
            },
            provider: playwright({
              connectOptions: {
                wsEndpoint: browserWsEndpoint,
                // el navegador del contenedor llega por aquí al servidor de Vitest de tu máquina
                exposeNetwork: '<loopback>',
              },
              // texto sin hinting ni posicionamiento subpíxel: capturas más estables
              launchOptions: {
                args: ['--font-render-hinting=none', '--disable-font-subpixel-positioning'],
              },
              contextOptions: {
                // ventana del navegador, mayor que cualquier viewport (tests/setup/viewports.ts)
                viewport: { width: browserWindow.width, height: browserWindow.height },
                deviceScaleFactor: 1,
                reducedMotion: 'reduce',
                locale: 'en-US',
                timezoneId: 'UTC',
                colorScheme: 'light',
              },
            }),
          },
        },
      },
    ],
  },
})
