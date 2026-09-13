<script setup lang="ts">
import { ref } from 'vue'
import { Moon, Palette, Sun } from '@lucide/vue'
import packageJson from '../../package.json'
import DocsComponentsSidebar from './DocsComponentsSidebar.vue'

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
</script>

<template>
  <div class="docs-shell">
    <header class="docs-topbar">
      <a href="#" class="docs-brand"
        ><span class="docs-brand-mark">N</span><span>nono-ui</span
        ><span class="docs-version">v{{ packageJson.version }}</span></a
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
      <div class="docs-sectionbar-inner"><span class="docs-section-title">Components</span></div>
    </div>
    <div class="docs-workspace">
      <div class="docs-mobile-nav">
        <details :open="pageOpen" @toggle="pageOpen = ($event.target as HTMLDetailsElement).open">
          <summary>On this page</summary>
          <nav>
            <a href="#">Overview</a><a href="#">Usage</a><a href="#">API</a><a href="#">Examples</a>
          </nav>
        </details>
      </div>
      <DocsComponentsSidebar />
      <main class="docs-content">
        <div class="docs-empty">
          <span class="docs-empty-kicker">Components</span>
          <h1>Documentación</h1>
          <p>Selecciona un componente para empezar a explorar su API y ejemplos.</p>
        </div>
      </main>
      <aside class="docs-toc">
        <div class="docs-toc-inner">
          <p>On this page</p>
          <a class="is-active" href="#">Overview</a><a href="#">Usage</a><a href="#">API</a
          ><a href="#">Examples</a>
        </div>
      </aside>
    </div>
  </div>
</template>
