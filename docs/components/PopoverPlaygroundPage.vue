<script setup lang="ts">
import { computed, ref } from 'vue'
import { Popover } from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'
import PlaygroundSelect from './playground/controls/PlaygroundSelect.vue'
import PlaygroundTextInput from './playground/controls/PlaygroundTextInput.vue'
import PlaygroundCheckbox from './playground/controls/PlaygroundCheckbox.vue'

const side = ref<'top' | 'right' | 'bottom' | 'left'>('bottom')
const align = ref<'start' | 'center' | 'end'>('center')
const sideOffset = ref('4')
const arrowWidth = ref('10')
const arrowHeight = ref('5')
const showArrow = ref(true)
const modal = ref(false)
const open = ref(false)
const sideFlip = ref(true)
const alignFlip = ref(true)
const avoidCollisions = ref(true)
const contentClass = ref('')

const content = computed(() => ({
  side: side.value,
  align: align.value,
  sideOffset: Number(sideOffset.value) || 0,
  sideFlip: sideFlip.value,
  alignFlip: alignFlip.value,
  avoidCollisions: avoidCollisions.value,
  class: contentClass.value || undefined,
}))

const arrow = computed(() => ({
  width: Number(arrowWidth.value) || 10,
  height: Number(arrowHeight.value) || 5,
}))
</script>

<template>
  <div class="docs-shell">
    <header class="docs-topbar">
      <a class="docs-brand" href="/components/icon"
        ><span class="docs-brand-mark">N</span><span>nono-ui</span></a
      >
    </header>
    <div class="docs-sectionbar">
      <div class="docs-sectionbar-inner">
        <a class="docs-section-title" href="/components">Components</a
        ><span class="docs-section-current">/ Playground</span>
      </div>
    </div>
    <main class="docs-content">
      <article class="docs-page mx-auto grid max-w-5xl gap-8 px-5 py-10 sm:px-8 sm:py-14">
        <header class="grid gap-3">
          <h1 class="text-4xl font-semibold tracking-tight">Playground</h1>
          <p class="max-w-2xl text-base leading-7 text-muted-foreground">
            Prueba la API agrupada de Popover, Content y Arrow en tiempo real.
          </p>
        </header>
        <section class="grid gap-6 rounded-xl border bg-card p-5 text-card-foreground sm:p-7">
          <div class="playground-example-controls">
            <PlaygroundSelect
              v-model="side"
              label="Side"
              :options="['top', 'right', 'bottom', 'left']"
            />
            <PlaygroundSelect v-model="align" label="Align" :options="['start', 'center', 'end']" />
            <PlaygroundTextInput v-model="sideOffset" label="Side offset" />
            <PlaygroundTextInput v-model="arrowWidth" label="Arrow width" />
            <PlaygroundTextInput v-model="arrowHeight" label="Arrow height" />
            <PlaygroundTextInput
              v-model="contentClass"
              label="Content class"
              placeholder="rounded-xl"
            />
            <PlaygroundCheckbox v-model="showArrow" label="Show arrow" />
            <PlaygroundCheckbox v-model="modal" label="Modal" />
            <PlaygroundCheckbox v-model="sideFlip" label="Side flip" />
            <PlaygroundCheckbox v-model="alignFlip" label="Align flip" />
            <PlaygroundCheckbox v-model="avoidCollisions" label="Avoid collisions" />
          </div>
          <div
            class="flex min-h-64 items-center justify-center rounded-lg border border-dashed p-12"
          >
            <Popover
              v-model:open="open"
              :modal="modal"
              :content="content"
              :arrow="arrow"
              :show-arrow="showArrow"
            >
              <Button label="Abrir Popover" />
              <template #content="{ close }">
                <div class="grid gap-3">
                  <strong>Popover de prueba</strong>
                  <p class="text-sm">Content y Arrow se configuran como objetos.</p>
                  <Button label="Cerrar" size="sm" @click="close" />
                </div>
              </template>
            </Popover>
          </div>
        </section>
      </article>
    </main>
  </div>
</template>
