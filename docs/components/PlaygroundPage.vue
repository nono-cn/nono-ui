<script setup lang="ts">
import { compile, computed, defineComponent, ref, shallowRef, watch } from 'vue'
import type { Component } from 'vue'
import { Check, Clipboard, RotateCcw } from '@lucide/vue'
import { RouterLink } from 'vue-router'

interface PlaygroundEntry {
  name: string
  component: Component
}

const componentModules = import.meta.glob('../../src/components/ui/*/*.vue', {
  eager: true,
  import: 'default',
}) as Record<string, Component>

const componentEntries = Object.entries(componentModules)
  .reduce<PlaygroundEntry[]>((entries, [path, component]) => {
    const segments = path.split('/')
    const folder = segments[segments.length - 2]
    const fileName = segments[segments.length - 1]?.replace(/\.vue$/, '')

    if (folder && fileName === folder) entries.push({ name: folder, component })

    return entries
  }, [])
  .sort((a, b) => a.name.localeCompare(b.name))

const componentRegistry = Object.fromEntries(
  componentEntries.map((entry) => [entry.name, entry.component]),
)

const starterOverrides: Record<string, string> = {
  Alert: `<template>
  <Alert
    label="Estado del proceso"
    description="Este mensaje se está probando desde el playground."
  />
</template>`,
  Avatar: `<template>
  <Avatar label="JS" />
</template>`,
  Badge: `<template>
  <Badge label="Badge de prueba" />
</template>`,
  Button: `<template>
  <Button>Probar componente</Button>
</template>`,
  Card: `<template>
  <Card
    label="Card de prueba"
    description="Edita este componente desde el editor."
  />
</template>`,
  Chip: `<template>
  <Chip label="Chip de prueba" />
</template>`,
  Icon: `<template>
  <Icon name="check" />
</template>`,
  Label: `<template>
  <Label for="playground-input">Etiqueta de prueba</Label>
</template>`,
  Progress: `<template>
  <Progress :value="65" :max="100" />
</template>`,
  Separator: `<template>
  <Separator />
</template>`,
}

const selectedName = ref('Button')
const editorCode = ref(starterOverrides.Button)
const compileError = ref('')
const copied = ref(false)
const previewKey = ref(0)
const previewComponent = shallowRef<Component | null>(null)
let copyTimer: ReturnType<typeof setTimeout> | undefined

const editorLines = computed(() =>
  Array.from({ length: Math.max(1, editorCode.value.split('\n').length) }, (_, index) => index + 1),
)

function starterCode(name: string) {
  return starterOverrides[name] ?? `<template>\n  <${name} />\n</template>`
}

function extractTemplate(source: string) {
  const match = source.match(/<template(?:\s[^>]*)?>([\s\S]*)<\/template>/i)
  return (match?.[1] ?? source).trim()
}

function compilePreview(source: string) {
  const template = extractTemplate(source)

  if (!template) {
    compileError.value = 'Añade contenido dentro de un bloque <template>.'
    previewComponent.value = null
    return
  }

  try {
    let compilerError = ''
    const render = compile(template, {
      onError: (error) => {
        compilerError = error.message
      },
    })

    if (compilerError) throw new Error(compilerError)

    previewComponent.value = defineComponent({
      name: 'PlaygroundPreview',
      components: componentRegistry,
      render,
    })
    compileError.value = ''
    previewKey.value += 1
  } catch (error) {
    compileError.value = error instanceof Error ? error.message : 'No se pudo compilar el template.'
    previewComponent.value = null
  }
}

function selectComponent(name: string) {
  selectedName.value = name
  editorCode.value = starterCode(name)
}

function resetEditor() {
  editorCode.value = starterCode(selectedName.value)
}

async function copyCode() {
  if (!navigator.clipboard) return

  await navigator.clipboard.writeText(editorCode.value)
  copied.value = true
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => (copied.value = false), 1600)
}

watch(editorCode, compilePreview, { immediate: true })
</script>

<template>
  <article class="playground-page">
    <header class="playground-heading">
      <div class="playground-heading-row">
        <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">Playground</h1>
        <span class="playground-count">{{ componentEntries.length }} componentes</span>
      </div>
      <p>
        Edita el componente Vue y mira el resultado en directo. Escribe dentro del bloque
        <code>&lt;template&gt;</code> para probar cualquier componente de la librería.
      </p>
    </header>

    <section class="playground-workbench" aria-label="Playground interactivo">
      <div class="playground-preview-panel">
        <div class="playground-panel-header">
          <div>
            <span class="playground-eyebrow">Preview</span>
            <h2>Resultado</h2>
          </div>
          <span class="playground-live-status" :class="{ 'has-error': compileError }">
            <span aria-hidden="true" />
            {{ compileError ? 'Error' : 'Live' }}
          </span>
        </div>

        <div class="playground-preview" :class="{ 'has-error': compileError }">
          <component
            :is="previewComponent"
            v-if="previewComponent"
            :key="previewKey"
            class="playground-preview-content"
          />
          <div v-else class="playground-preview-error" role="alert">
            <strong>No se puede mostrar la preview</strong>
            <span>{{ compileError }}</span>
          </div>
        </div>
      </div>

      <div class="playground-editor-panel">
        <div class="playground-editor-toolbar">
          <label for="playground-component">
            <span class="sr-only">Componente inicial</span>
            <select
              id="playground-component"
              :value="selectedName"
              aria-label="Componente inicial"
              @change="selectComponent(($event.target as HTMLSelectElement).value)"
            >
              <option v-for="entry in componentEntries" :key="entry.name" :value="entry.name">
                {{ entry.name }}
              </option>
            </select>
          </label>
          <span class="playground-file-name">Component.vue</span>
          <span class="playground-language">Vue</span>
          <button
            type="button"
            class="playground-toolbar-button"
            title="Restablecer componente"
            aria-label="Restablecer componente"
            @click="resetEditor"
          >
            <RotateCcw class="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="playground-toolbar-button"
            :title="copied ? 'Código copiado' : 'Copiar código'"
            :aria-label="copied ? 'Código copiado' : 'Copiar código'"
            @click="copyCode"
          >
            <Check v-if="copied" class="size-4" aria-hidden="true" />
            <Clipboard v-else class="size-4" aria-hidden="true" />
          </button>
        </div>

        <div class="playground-code-editor">
          <div class="playground-line-numbers" aria-hidden="true">
            <span v-for="line in editorLines" :key="line">{{ line }}</span>
          </div>
          <textarea
            v-model="editorCode"
            aria-label="Código del componente Vue"
            spellcheck="false"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
          />
        </div>

        <footer class="playground-editor-footer">
          <span><span class="playground-status-dot" /> Compilación en tiempo real</span>
          <span>Solo se ejecuta el bloque <code>&lt;template&gt;</code></span>
        </footer>
      </div>
    </section>

    <aside class="playground-help">
      <div>
        <strong>Prueba rápida</strong>
        <p>
          Cambia los atributos, añade slots o combina componentes directamente en el editor. El
          selector solo carga una plantilla inicial; después puedes modificarla libremente.
        </p>
      </div>
      <RouterLink to="/components/button">Consulta la documentación de componentes</RouterLink>
    </aside>
  </article>
</template>

<style scoped>
.playground-page {
  display: grid;
  gap: 2rem;
  width: min(100%, 1180px);
  margin: 0 auto;
  padding: 2.5rem 1.25rem 4rem;
}

.playground-heading {
  display: grid;
  gap: 1rem;
}

.playground-heading-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.playground-count {
  border: 1px solid hsl(var(--border));
  border-radius: 999px;
  background: hsl(var(--muted) / 0.4);
  padding: 0.25rem 0.625rem;
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
}

.playground-heading p {
  max-width: 48rem;
  color: hsl(var(--muted-foreground));
  font-size: 0.9375rem;
  line-height: 1.75;
}

.playground-heading code,
.playground-editor-footer code {
  border-radius: 0.25rem;
  background: hsl(var(--muted));
  padding: 0.125rem 0.3rem;
  color: hsl(var(--foreground));
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.85em;
}

.playground-workbench {
  overflow: hidden;
  border: 1px solid hsl(var(--border));
  border-radius: 0.75rem;
  background: hsl(var(--card));
  box-shadow: 0 18px 45px hsl(var(--foreground) / 0.06);
}

.playground-preview-panel {
  border-bottom: 1px solid hsl(var(--border));
}

.playground-panel-header,
.playground-editor-toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 4.25rem;
  padding: 0.875rem 1rem;
}

.playground-panel-header {
  justify-content: space-between;
  border-bottom: 1px solid hsl(var(--border));
}

.playground-eyebrow {
  display: block;
  margin-bottom: 0.2rem;
  color: hsl(var(--muted-foreground));
  font-size: 0.6875rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.playground-panel-header h2 {
  font-size: 0.9375rem;
  font-weight: 650;
}

.playground-live-status {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: hsl(142 71% 35%);
  font-size: 0.75rem;
  font-weight: 600;
}

.playground-live-status span,
.playground-status-dot {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: currentColor;
}

.playground-live-status.has-error {
  color: hsl(var(--destructive));
}

.playground-preview {
  display: grid;
  min-height: 17rem;
  place-items: center;
  padding: 3rem 1.5rem;
  background-color: hsl(var(--background));
  background-image: radial-gradient(hsl(var(--border) / 0.7) 0.7px, transparent 0.7px);
  background-size: 12px 12px;
}

.playground-preview.has-error {
  background-image: none;
}

.playground-preview-content {
  max-width: 100%;
}

.playground-preview-error {
  display: grid;
  gap: 0.5rem;
  max-width: 34rem;
  border: 1px solid hsl(var(--destructive) / 0.35);
  border-radius: 0.5rem;
  background: hsl(var(--destructive) / 0.08);
  padding: 1rem;
  color: hsl(var(--destructive));
  font-size: 0.8125rem;
  line-height: 1.5;
  text-align: center;
}

.playground-preview-error span {
  overflow-wrap: anywhere;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
}

.playground-editor-panel {
  background: #101318;
  color: #e5e7eb;
}

.playground-editor-toolbar {
  border-bottom: 1px solid #282e38;
  background: #171a21;
  color: #9ca3af;
}

.playground-editor-toolbar label {
  flex: 0 1 13rem;
}

.playground-editor-toolbar select {
  width: 100%;
  height: 2.125rem;
  border: 1px solid #343b47;
  border-radius: 0.375rem;
  background: #20252e;
  padding: 0 0.625rem;
  color: #f3f4f6;
  font-size: 0.8125rem;
}

.playground-file-name {
  border-left: 1px solid #343b47;
  padding-left: 0.875rem;
  color: #d1d5db;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
}

.playground-language {
  margin-left: auto;
  font-size: 0.75rem;
}

.playground-toolbar-button {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  color: #9ca3af;
  transition: 120ms ease;
}

.playground-toolbar-button:hover {
  border-color: #343b47;
  background: #20252e;
  color: #f3f4f6;
}

.playground-code-editor {
  display: grid;
  grid-template-columns: 3.25rem minmax(0, 1fr);
  min-height: 22rem;
  max-height: 36rem;
  overflow: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.8125rem;
  line-height: 1.7;
}

.playground-line-numbers {
  display: grid;
  align-content: start;
  justify-items: end;
  border-right: 1px solid #282e38;
  padding: 1rem 0.75rem 1rem 0.5rem;
  color: #596273;
  user-select: none;
}

.playground-code-editor textarea {
  width: 100%;
  min-height: 22rem;
  resize: vertical;
  border: 0;
  outline: 0;
  background: transparent;
  padding: 1rem 1.25rem;
  color: #d9e1ee;
  caret-color: #7dd3fc;
  font: inherit;
  line-height: inherit;
  tab-size: 2;
  white-space: pre;
}

.playground-code-editor textarea:focus {
  box-shadow: inset 2px 0 #38bdf8;
}

.playground-editor-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  border-top: 1px solid #282e38;
  padding: 0.625rem 1rem;
  color: #788395;
  font-size: 0.6875rem;
}

.playground-editor-footer span:first-child {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: #86efac;
}

.playground-help {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem 2rem;
  border: 1px solid hsl(var(--border));
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  color: hsl(var(--muted-foreground));
  font-size: 0.8125rem;
  line-height: 1.6;
}

.playground-help strong {
  display: block;
  margin-bottom: 0.25rem;
  color: hsl(var(--foreground));
}

.playground-help p {
  max-width: 42rem;
}

.playground-help a {
  align-self: center;
  color: hsl(var(--primary));
  text-underline-offset: 0.2em;
}

.playground-help a:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .playground-page {
    padding: 2rem 1rem 3rem;
  }

  .playground-panel-header,
  .playground-editor-toolbar {
    padding-right: 0.75rem;
    padding-left: 0.75rem;
  }

  .playground-file-name {
    display: none;
  }
}
</style>
