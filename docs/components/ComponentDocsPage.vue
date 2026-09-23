<script setup lang="ts">
import { computed } from 'vue'
import ApiTable from './docs/ApiTable.vue'
import type { ComponentDocConfig } from '../config/component-docs'
import { exampleAnchor } from '../config/docs-anchors'
import { docsPackageName } from '../config/constants'

const props = defineProps<{
  component: ComponentDocConfig
}>()

const content = computed(() => {
  if (props.component.language === 'en') {
    return {
      importTitle: 'Import',
      playgroundTitle: 'Playground',
      usageTitle: 'Usage',
      examplesTitle: 'Examples',
      accessibilityTitle: 'Accessibility',
      apiTitle: 'API',
      emptyProps: 'This component does not define any props.',
      emptyEmits: 'This component does not emit any custom events.',
      emptySlots: 'This component does not define any slots.',
      emptyExpose: 'This component does not expose any methods.',
    }
  }

  return {
    importTitle: 'Importación',
    playgroundTitle: 'Playground',
    usageTitle: 'Uso',
    examplesTitle: 'Ejemplos',
    accessibilityTitle: 'Accesibilidad',
    apiTitle: 'API',
    emptyProps: 'Este componente no define props propias.',
    emptyEmits: 'Este componente no emite eventos propios.',
    emptySlots: 'Este componente no define slots.',
    emptyExpose: 'Este componente no expone métodos.',
  }
})

function publicImportPath(importPath: string) {
  return importPath.replace(/^@nono-ui/, docsPackageName)
}
</script>

<template>
  <article class="docs-page mx-auto grid min-w-0 gap-12 px-5 py-10 sm:px-8 sm:py-14">
    <header id="overview" class="grid scroll-mt-8 gap-4">
      <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">{{ component.title }}</h1>
      <p class="max-w-2xl text-base leading-7 text-muted-foreground">
        {{ component.description }}
      </p>
    </header>

    <section id="import" class="grid scroll-mt-8 gap-5">
      <h2 class="text-2xl font-semibold tracking-tight">{{ content.importTitle }}</h2>
      <pre
        class="overflow-x-auto rounded-xl border bg-muted/40 p-4 text-sm"
      ><code>import { {{ component.title }} } from '{{ publicImportPath(component.importPath) }}'</code></pre>
    </section>

    <section v-if="component.playground" id="playground" class="grid scroll-mt-8 gap-5">
      <h2 class="text-2xl font-semibold tracking-tight">{{ content.playgroundTitle }}</h2>
      <component :is="component.playground" />
    </section>

    <section
      v-if="!component.playground"
      id="usage"
      class="grid min-w-0 scroll-mt-8 grid-cols-1 gap-5"
    >
      <h2 class="text-2xl font-semibold tracking-tight">{{ content.usageTitle }}</h2>
      <div class="grid min-w-0 grid-cols-1 gap-6">
        <div
          v-for="(example, index) in component.usage"
          :id="exampleAnchor('usage', example.title, index)"
          :key="example.title"
          class="min-w-0 scroll-mt-8"
        >
          <component :is="example.component" />
        </div>
      </div>
    </section>

    <section
      v-if="!component.playground"
      id="examples"
      class="grid min-w-0 scroll-mt-8 grid-cols-1 gap-5"
    >
      <h2 class="text-2xl font-semibold tracking-tight">{{ content.examplesTitle }}</h2>
      <div class="grid min-w-0 grid-cols-1 gap-6">
        <div
          v-for="(example, index) in component.examples"
          :id="exampleAnchor('examples', example.title, index)"
          :key="example.title"
          class="min-w-0 scroll-mt-8"
        >
          <component :is="example.component" />
        </div>
      </div>
    </section>

    <section id="accessibility" class="grid scroll-mt-8 gap-5">
      <h2 class="text-2xl font-semibold tracking-tight">{{ content.accessibilityTitle }}</h2>
      <div class="grid gap-5">
        <article
          v-for="item in component.accessibility"
          :key="item.title"
          class="grid gap-3 rounded-xl border bg-card p-4 text-card-foreground sm:p-5"
        >
          <h3 class="font-semibold">{{ item.title }}</h3>
          <p class="text-sm leading-6 text-muted-foreground">{{ item.description }}</p>
          <div v-if="item.links?.length" class="grid gap-2">
            <a
              v-for="link in item.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noreferrer"
              class="w-fit text-sm text-primary underline-offset-4 hover:underline"
            >
              {{ link.label }}
            </a>
          </div>
        </article>
      </div>
    </section>

    <section id="api" class="grid scroll-mt-8 gap-5">
      <h2 class="text-2xl font-semibold tracking-tight">{{ content.apiTitle }}</h2>

      <div class="grid gap-8">
        <ApiTable
          v-if="component.api.props.length"
          id="props"
          title="Props"
          :rows="component.api.props"
          :language="component.language"
          :empty-text="content.emptyProps"
        />
        <template v-for="table in component.api.configs ?? []" :key="table.id">
          <p v-if="table.description" class="text-sm leading-6 text-muted-foreground">
            {{ table.description }}
          </p>
          <ApiTable
            v-if="table.rows.length"
            :id="table.id"
            :title="table.title"
            :rows="table.rows"
            :language="component.language"
            :type-label="table.typeLabel"
            :show-default="table.showDefault"
          />
        </template>
        <ApiTable
          v-if="component.api.emits.length"
          id="emits"
          title="Emits"
          :rows="component.api.emits"
          :language="component.language"
          :show-default="false"
          :empty-text="content.emptyEmits"
        />
        <ApiTable
          v-if="component.api.slots.length"
          id="slots"
          title="Slots"
          type-label="slotProps"
          :rows="component.api.slots"
          :language="component.language"
          :show-default="false"
          :empty-text="content.emptySlots"
        />
        <ApiTable
          v-if="component.api.expose.length"
          id="expose"
          title="Expose"
          :rows="component.api.expose"
          :language="component.language"
          :show-default="false"
          :empty-text="content.emptyExpose"
        />
      </div>
    </section>
  </article>
</template>
