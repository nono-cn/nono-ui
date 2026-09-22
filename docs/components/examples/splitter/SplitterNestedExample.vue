<script setup lang="ts">
import { Splitter } from '@/components/ui/Splitter'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const workspaceItems = [
  { id: 'navigation', slot: 'navigation', defaultSize: 24, minSize: 18 },
  { id: 'workspace', slot: 'workspace', defaultSize: 76, minSize: 50 },
]

const editorItems = [
  { id: 'editor', slot: 'editor', defaultSize: 68, minSize: 35 },
  { id: 'terminal', slot: 'terminal', defaultSize: 32, minSize: 20 },
]

const code = `<script setup lang="ts">
import { Splitter } from '__DOCS_PACKAGE__/components/ui/Splitter'

const workspaceItems = [
  { id: 'navigation', slot: 'navigation', defaultSize: 24, minSize: 18 },
  { id: 'workspace', slot: 'workspace', defaultSize: 76, minSize: 50 },
]

const editorItems = [
  { id: 'editor', slot: 'editor', defaultSize: 68, minSize: 35 },
  { id: 'terminal', slot: 'terminal', defaultSize: 32, minSize: 20 },
]
${scriptEnd}

<template>
  <div class="h-80 w-full">
    <Splitter :items="workspaceItems" class="w-full overflow-hidden rounded-lg border">
      <template #panel-navigation>
        <div class="h-full bg-muted/30 p-3 text-sm">
          <p class="mb-3 font-medium">Project</p>
          <p class="rounded bg-background px-2 py-1">src /</p>
          <p class="mt-2 px-2">App.vue</p>
          <p class="mt-1 px-2 text-muted-foreground">main.ts</p>
        </div>
      </template>
      <template #panel-workspace>
        <div class="h-full min-h-0 p-2">
          <Splitter
            :items="editorItems"
            direction="vertical"
            class="h-full w-full overflow-hidden rounded-md border"
          >
            <template #panel-editor>
              <div class="h-full p-3 font-mono text-xs leading-6">
                <p class="text-muted-foreground">1 &nbsp; &lt;template&gt;</p>
                <p>2 &nbsp; &lt;main&gt;Hello, world!&lt;/main&gt;</p>
                <p class="text-muted-foreground">3 &nbsp; &lt;/template&gt;</p>
              </div>
            </template>
            <template #panel-terminal>
              <div class="h-full bg-slate-950 p-3 font-mono text-xs text-slate-100">
                <p class="text-emerald-400">$ npm run dev</p>
                <p class="mt-2 text-slate-300">Local: http://localhost:5173/</p>
              </div>
            </template>
          </Splitter>
        </div>
      </template>
    </Splitter>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Nested"
    description="Anida un grupo vertical dentro de un panel para construir un editor con terminal redimensionable."
    :code="code"
    :show-reset="false"
  >
    <div class="h-80 w-full">
      <Splitter :items="workspaceItems" class="w-full overflow-hidden rounded-lg border">
        <template #panel-navigation>
          <div class="h-full bg-muted/30 p-3 text-sm">
            <p class="mb-3 font-medium">Project</p>
            <p class="rounded bg-background px-2 py-1">src /</p>
            <p class="mt-2 px-2">App.vue</p>
            <p class="mt-1 px-2 text-muted-foreground">main.ts</p>
          </div>
        </template>
        <template #panel-workspace>
          <div class="h-full min-h-0 p-2">
            <Splitter
              :items="editorItems"
              direction="vertical"
              class="h-full w-full overflow-hidden rounded-md border"
            >
              <template #panel-editor>
                <div class="h-full p-3 font-mono text-xs leading-6">
                  <p class="text-muted-foreground">1 &nbsp; &lt;template&gt;</p>
                  <p>2 &nbsp; &lt;main&gt;Hello, world!&lt;/main&gt;</p>
                  <p class="text-muted-foreground">3 &nbsp; &lt;/template&gt;</p>
                </div>
              </template>
              <template #panel-terminal>
                <div class="h-full bg-slate-950 p-3 font-mono text-xs text-slate-100">
                  <p class="text-emerald-400">$ npm run dev</p>
                  <p class="mt-2 text-slate-300">Local: http://localhost:5173/</p>
                </div>
              </template>
            </Splitter>
          </div>
        </template>
      </Splitter>
    </div>
  </ComponentExample>
</template>
