<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Moon, Palette, Sun } from '@lucide/vue'
import { RouterLink, useRoute } from 'vue-router'
import packageJson from '../../package.json'
import DocsComponentsSidebar from './DocsComponentsSidebar.vue'
import ComponentDocsPage from './ComponentDocsPage.vue'
import PlaygroundPage from './PlaygroundPage.vue'
import { docsComponentsBySlug } from '../config/docs-components'

const route = useRoute()
const dark = ref(false)
const themeOpen = ref(false)
const pageOpen = ref(false)
const isPlayground = computed(() => route.path === '/playground')
const variables = ref([
  { name: '--primary', value: 'oklch(0.51 0.11 248)' },
  { name: '--radius', value: '0.625rem' },
  { name: '--background', value: 'oklch(1 0 0)' },
  { name: '--foreground', value: 'oklch(0.145 0 0)' },
])
function toggleTheme() {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value)
}

const component = computed(() => docsComponentsBySlug[String(route.params.slug)])
const pageTitle = computed(() =>
  isPlayground.value
    ? 'Playground · nono-ui'
    : component.value
      ? `${component.value.title} · nono-ui`
      : 'nono-ui · Components',
)
const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'import', label: 'Import' },
  { id: 'usage', label: 'Usage' },
  { id: 'examples', label: 'Examples' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'api', label: 'API' },
]
const desktopTocItems = tocItems.filter((item) => item.id !== 'overview')

watch(pageTitle, (value) => (document.title = value), { immediate: true })
</script>

<template>
  <div class="docs-shell">
    <header class="docs-topbar">
      <RouterLink to="/components/icon" class="docs-brand"
        ><span class="docs-brand-mark">N</span><span>nono-ui</span
        ><span class="docs-version">v{{ packageJson.version }}</span></RouterLink
      >
      <RouterLink
        to="/playground"
        class="docs-playground-link"
        :class="{ 'docs-playground-link-active': isPlayground }"
      >
        Playground
      </RouterLink>
      <div class="docs-actions">
        <div class="docs-theme-wrap">
          <button class="docs-icon-button" @click="themeOpen = !themeOpen">
            <Palette :size="16" />
          </button>
          <div v-if="themeOpen" class="docs-theme-popover">
            <div class="docs-popover-heading">
              <div><strong>Personalizar tema</strong><small>Variables CSS del diseño</small></div>
              <button class="docs-close" @click="themeOpen = false">×</button>
            </div>
            <label v-for="variable in variables" :key="variable.name"
              ><span>{{ variable.name }}</span
              ><input
                v-model="variable.value"
                @input="document.documentElement.style.setProperty(variable.name, variable.value)"
            /></label>
          </div>
        </div>
        <button class="docs-icon-button" @click="toggleTheme">
          <Sun v-if="dark" :size="16" /><Moon v-else :size="16" />
        </button>
      </div>
    </header>
    <div class="docs-sectionbar">
      <div class="docs-sectionbar-inner">
        <RouterLink :to="isPlayground ? '/playground' : '/components'" class="docs-section-title">
          {{ isPlayground ? 'Playground' : 'Components' }}
        </RouterLink>
        <span v-if="component" class="docs-section-current">/ {{ component.title }}</span>
      </div>
    </div>
    <div class="docs-workspace" :class="{ 'docs-workspace-playground': isPlayground }">
      <div v-if="component" class="docs-mobile-nav">
        <details :open="pageOpen" @toggle="pageOpen = ($event.target as HTMLDetailsElement).open">
          <summary>On this page</summary>
          <nav>
            <a v-for="item in tocItems" :key="item.id" :href="`#${item.id}`">{{ item.label }}</a>
          </nav>
        </details>
      </div>
      <DocsComponentsSidebar v-if="!isPlayground" />
      <main class="docs-content">
        <PlaygroundPage v-if="isPlayground" />
        <ComponentDocsPage v-else-if="component" :component="component" />
        <div v-else class="docs-empty">
          <span class="docs-empty-kicker">Components</span>
          <h1>Componente no encontrado</h1>
          <p>Selecciona un componente disponible en la navegación.</p>
        </div>
      </main>
      <aside v-if="component" class="docs-toc">
        <div class="docs-toc-inner">
          <p>On this page</p>
          <a
            v-for="(item, index) in desktopTocItems"
            :key="item.id"
            :class="{ 'is-active': index === 0 }"
            :href="`#${item.id}`"
          >
            {{ item.label }}
          </a>
        </div>
      </aside>
    </div>
  </div>
</template>
