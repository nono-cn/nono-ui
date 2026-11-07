import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sourceRoot = path.resolve(__dirname, 'src')
const componentsRoot = path.join(sourceRoot, 'components')
const entries = {
  index: path.join(sourceRoot, 'index.js'),
  'components/constants': path.join(componentsRoot, 'constants.ts'),
  ...Object.fromEntries(
    readdirSync(componentsRoot, { withFileTypes: true })
      // internal no es un componente público
      .filter((entry) => entry.isDirectory() && entry.name !== 'internal')
      .map((entry) => [
        `components/${entry.name}/index`,
        path.join(componentsRoot, entry.name, 'index.ts'),
      ]),
  ),
  ...Object.fromEntries(
    readdirSync(path.join(sourceRoot, 'composables'))
      .filter((file) => file.endsWith('.ts'))
      .map((file) => [
        `composables/${path.basename(file, '.ts')}`,
        path.join(sourceRoot, 'composables', file),
      ]),
  ),
  'lib/utils': path.join(sourceRoot, 'lib/utils.ts'),
  'assets/icons/index': path.join(sourceRoot, 'assets/icons/index.ts'),
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      include: [
        'src/components/**/*',
        'src/composables/**/*.ts',
        'src/i18n/**/*',
        'src/lib/**/*.ts',
        'src/assets/icons/**/*.ts',
        'src/assets/icon/**/*.ts',
        'src/index.js',
      ],
      // los tests viven junto a cada componente (__tests__): sin tipos en dist/.
      // Sustituye al exclude por defecto, por eso se repite node_modules.
      exclude: ['node_modules/**', 'src/**/__tests__/**'],
      rollupTypes: false,
      entryRoot: 'src',
    }),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  publicDir: false,
  build: {
    lib: {
      entry: entries,
      formats: ['es'],
      cssFileName: 'style',
    },
    rollupOptions: {
      external: [
        'vue',
        'reka-ui',
        '@lucide/vue',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'vue-input-otp',
        'vue-router',
        'vue-i18n',
        '@vueuse/core',
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        assetFileNames: (assetInfo) =>
          assetInfo.name === 'style.css' ? 'style.css' : 'assets/[name][extname]',
      },
    },
  },
})
