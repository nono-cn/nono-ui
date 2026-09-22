import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.GITHUB_ACTIONS && repositoryName ? `/${repositoryName}/` : '/'

export default defineConfig({
  root: path.resolve(__dirname, 'docs'),
  base,
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: /^vue$/,
        replacement: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js'),
      },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@nono-ui', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  build: {
    outDir: path.resolve(__dirname, 'docs-dist'),
    emptyOutDir: true,
  },
})
