import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sourceRoot = path.resolve(__dirname, 'src')
const uiRoot = path.join(sourceRoot, 'components/ui')
const entries = {
  index: path.join(sourceRoot, 'index.js'),
  'components/provider/index': path.join(sourceRoot, 'components/provider/index.ts'),
  'components/ui/constants': path.join(uiRoot, 'constants.ts'),
  ...Object.fromEntries(
    readdirSync(uiRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => [
        `components/ui/${entry.name}/index`,
        path.join(uiRoot, entry.name, 'index.ts'),
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
        'src/components/provider/**/*',
        'src/components/ui/**/*',
        'src/composables/**/*.ts',
        'src/i18n/**/*',
        'src/lib/**/*.ts',
        'src/assets/icons/**/*.ts',
        'src/index.js',
      ],
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
        '@unovis/ts',
        '@unovis/vue',
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
