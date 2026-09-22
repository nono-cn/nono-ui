<script setup lang="ts">
import { Splitter } from '@/components/ui/Splitter'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  { id: 'files', slot: 'files', defaultSize: 24, minSize: 18 },
  { id: 'editor', defaultSize: 52, minSize: 32 },
  { id: 'details', slot: 'details', defaultSize: 24, minSize: 18 },
]

const code = `<script setup lang="ts">
import { Splitter } from '__DOCS_PACKAGE__/components/ui/Splitter'

const items = [
  { id: 'files', slot: 'files', defaultSize: 24, minSize: 18 },
  { id: 'editor', defaultSize: 52, minSize: 32 },
  { id: 'details', slot: 'details', defaultSize: 24, minSize: 18 },
]
${scriptEnd}

<template>
  <div class="h-64 w-full">
    <Splitter :items="items" class="w-full overflow-hidden rounded-lg border">
      <template #panel-files="{ item }">
        <div class="h-full bg-muted/30 p-3 text-xs">
          <p class="mb-3 font-semibold uppercase tracking-wide">{{ item.id }}</p>
          <div class="grid gap-2">
            <span class="rounded bg-background px-2 py-1">⌄ src</span>
            <span class="rounded bg-primary/10 px-2 py-1 font-medium">↳ App.vue</span>
            <span class="px-2 py-1">↳ main.ts</span>
            <span class="rounded bg-background px-2 py-1">⌄ components</span>
            <span class="px-2 py-1">↳ Button.vue</span>
          </div>
        </div>
      </template>
      <template #default="{ index }">
        <div class="h-full min-w-0 p-3">
          <div class="mb-3 flex items-center justify-between border-b pb-2 text-xs">
            <span class="font-medium">App.vue</span>
            <span class="text-muted-foreground">{{ index + 1 }} · Vue</span>
          </div>
          <div class="space-y-2 font-mono text-[11px] leading-5 text-muted-foreground">
            <p><span class="text-primary">&lt;script setup&gt;</span></p>
            <p class="pl-3">const title = 'Workspace'</p>
            <p><span class="text-primary">&lt;/script&gt;</span></p>
            <p class="pt-1">&lt;template&gt;</p>
            <p class="pl-3">&lt;main&gt;{{ title }}&lt;/main&gt;</p>
            <p>&lt;/template&gt;</p>
          </div>
        </div>
      </template>
      <template #panel-details="{ item, last }">
        <div class="h-full bg-muted/30 p-3 text-xs">
          <p class="mb-3 font-semibold">{{ item.id }}</p>
          <dl class="grid gap-3">
            <div><dt class="text-muted-foreground">Type</dt><dd>Vue component</dd></div>
            <div><dt class="text-muted-foreground">Status</dt><dd>Modified</dd></div>
            <div><dt class="text-muted-foreground">Panel</dt><dd>{{ last ? 'Last' : 'Other' }}</dd></div>
          </dl>
        </div>
      </template>
      <template #handle-files>
        <span
          class="relative z-20 flex h-12 w-4 flex-col items-center justify-center gap-1 rounded-full border bg-background shadow-sm"
          aria-hidden="true"
        >
          <span class="size-1 rounded-full bg-muted-foreground/70" />
          <span class="size-1 rounded-full bg-muted-foreground/70" />
          <span class="size-1 rounded-full bg-muted-foreground/70" />
        </span>
      </template>
      <template #handle>
        <span
          class="relative z-20 grid size-6 place-items-center rounded-full bg-primary text-xs leading-none font-bold text-primary-foreground shadow-sm"
          aria-hidden="true"
        >
          ↔
        </span>
      </template>
    </Splitter>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Compón una interfaz de archivos con paneles dirigidos, contenido por defecto y manejadores personalizados."
    :code="code"
    :show-reset="false"
  >
    <div class="h-64 w-full">
      <Splitter :items="items" class="w-full overflow-hidden rounded-lg border">
        <template #panel-files="{ item }">
          <div class="h-full bg-muted/30 p-3 text-xs">
            <p class="mb-3 font-semibold tracking-wide uppercase">{{ item.id }}</p>
            <div class="grid gap-2">
              <span class="rounded bg-background px-2 py-1">⌄ src</span>
              <span class="rounded bg-primary/10 px-2 py-1 font-medium">↳ App.vue</span>
              <span class="px-2 py-1">↳ main.ts</span>
              <span class="rounded bg-background px-2 py-1">⌄ components</span>
              <span class="px-2 py-1">↳ Button.vue</span>
            </div>
          </div>
        </template>
        <template #default="{ index }">
          <div class="h-full min-w-0 p-3">
            <div class="mb-3 flex items-center justify-between border-b pb-2 text-xs">
              <span class="font-medium">App.vue</span>
              <span class="text-muted-foreground">{{ index + 1 }} · Vue</span>
            </div>
            <div class="space-y-2 font-mono text-[11px] leading-5 text-muted-foreground">
              <p><span class="text-primary">&lt;script setup&gt;</span></p>
              <p class="pl-3">const title = 'Workspace'</p>
              <p><span class="text-primary">&lt;/script&gt;</span></p>
              <p class="pt-1">&lt;template&gt;</p>
              <p class="pl-3">&lt;main&gt;&#123;&#123; title &#125;&#125;&lt;/main&gt;</p>
              <p>&lt;/template&gt;</p>
            </div>
          </div>
        </template>
        <template #panel-details="{ item, last }">
          <div class="h-full bg-muted/30 p-3 text-xs">
            <p class="mb-3 font-semibold">{{ item.id }}</p>
            <dl class="grid gap-3">
              <div>
                <dt class="text-muted-foreground">Type</dt>
                <dd>Vue component</dd>
              </div>
              <div>
                <dt class="text-muted-foreground">Status</dt>
                <dd>Modified</dd>
              </div>
              <div>
                <dt class="text-muted-foreground">Panel</dt>
                <dd>{{ last ? 'Last' : 'Other' }}</dd>
              </div>
            </dl>
          </div>
        </template>
        <template #handle-files>
          <span
            class="relative z-20 flex h-12 w-4 flex-col items-center justify-center gap-1 rounded-full border bg-background shadow-sm"
            aria-hidden="true"
          >
            <span class="size-1 rounded-full bg-muted-foreground/70" />
            <span class="size-1 rounded-full bg-muted-foreground/70" />
            <span class="size-1 rounded-full bg-muted-foreground/70" />
          </span>
        </template>
        <template #handle>
          <span
            class="relative z-20 grid size-6 place-items-center rounded-full bg-primary text-xs leading-none font-bold text-primary-foreground shadow-sm"
            aria-hidden="true"
          >
            ↔
          </span>
        </template>
      </Splitter>
    </div>
  </ComponentExample>
</template>
