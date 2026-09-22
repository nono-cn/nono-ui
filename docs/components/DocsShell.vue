<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Moon, Palette, Sun } from '@lucide/vue'
import { RouterLink, useRoute } from 'vue-router'
import packageJson from '../../package.json'
import DocsComponentsSidebar from './DocsComponentsSidebar.vue'
import ComponentDocsPage from './ComponentDocsPage.vue'
import { ConfigProvider } from '@/components/provider'
import { docsComponentsBySlug } from '../config/docs-components'
import { exampleAnchor } from '../config/docs-anchors'

const route = useRoute()
const dark = ref(false)
const themeOpen = ref(false)
const pageOpen = ref(false)
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
  component.value ? `${component.value.title} · nono-ui` : 'nono-ui · Componentes',
)
interface DocsTocItem {
  id: string
  label: string
  children?: DocsTocItem[]
}

const tocTree = computed<DocsTocItem[]>(() => {
  const currentComponent = component.value
  if (!currentComponent) return []

  const items: DocsTocItem[] = [{ id: 'import', label: 'Importación' }]

  if (currentComponent.playground) {
    items.push({ id: 'playground', label: 'Playground' })
  } else {
    if (currentComponent.usage.length) {
      items.push({
        id: 'usage',
        label: 'Uso',
        children: currentComponent.usage.map((example, index) => ({
          id: exampleAnchor('usage', example.title, index),
          label: example.title,
        })),
      })
    }

    if (currentComponent.examples.length) {
      items.push({
        id: 'examples',
        label: 'Ejemplos',
        children: currentComponent.examples.map((example, index) => ({
          id: exampleAnchor('examples', example.title, index),
          label: example.title,
        })),
      })
    }
  }

  items.push({ id: 'accessibility', label: 'Accesibilidad' })

  const apiChildren: DocsTocItem[] = []
  if (currentComponent.api.props.length) apiChildren.push({ id: 'props', label: 'Props' })
  for (const table of currentComponent.api.configs ?? []) {
    if (table.rows.length) apiChildren.push({ id: table.id, label: table.title })
  }
  if (currentComponent.api.emits.length) apiChildren.push({ id: 'emits', label: 'Emits' })
  if (currentComponent.api.slots.length) apiChildren.push({ id: 'slots', label: 'Slots' })
  if (currentComponent.api.expose.length) apiChildren.push({ id: 'expose', label: 'Expose' })

  items.push({ id: 'api', label: 'API', children: apiChildren })
  return items
})

watch(pageTitle, (value) => (document.title = value), { immediate: true })
</script>

<template>
  <ConfigProvider>
    <div class="docs-shell">
      <header class="docs-topbar">
        <RouterLink to="/components/icon" class="docs-brand"
          ><span class="docs-brand-mark">N</span><span>nono-ui</span
          ><span class="docs-version">v{{ packageJson.version }}</span></RouterLink
        >
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
                  @input="
                    document.documentElement.style.setProperty(variable.name, variable.value)
                  "
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
          <RouterLink to="/components" class="docs-section-title"> Componentes </RouterLink>
          <span v-if="component" class="docs-section-current">/ {{ component.title }}</span>
        </div>
      </div>
      <div class="docs-workspace">
        <div v-if="component" class="docs-mobile-nav">
          <details :open="pageOpen" @toggle="pageOpen = ($event.target as HTMLDetailsElement).open">
            <summary>En esta página</summary>
            <nav aria-label="En esta página">
              <ul class="docs-mobile-toc-tree">
                <li v-for="item in tocTree" :key="item.id">
                  <a :href="`#${item.id}`">{{ item.label }}</a>
                  <ul v-if="item.children?.length" class="docs-mobile-toc-children">
                    <li v-for="child in item.children" :key="child.id">
                      <a :href="`#${child.id}`">{{ child.label }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </details>
        </div>
        <DocsComponentsSidebar />
        <main class="docs-content">
          <ComponentDocsPage v-if="component" :component="component" />
          <div v-else class="docs-empty">
            <span class="docs-empty-kicker">Componentes</span>
            <h1>Componente no encontrado</h1>
            <p>Selecciona un componente disponible en la navegación.</p>
          </div>
        </main>
        <aside v-if="component" class="docs-toc">
          <div class="docs-toc-inner">
            <p>En esta página</p>
            <nav aria-label="En esta página">
              <ul class="docs-toc-tree">
                <li v-for="(item, index) in tocTree" :key="item.id">
                  <a :class="{ 'is-active': index === 0 }" :href="`#${item.id}`">
                    {{ item.label }}
                  </a>
                  <ul v-if="item.children?.length" class="docs-toc-children">
                    <li v-for="child in item.children" :key="child.id">
                      <a :href="`#${child.id}`">{{ child.label }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  </ConfigProvider>
</template>
