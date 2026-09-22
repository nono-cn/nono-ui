<script setup lang="ts">
import ApiTable from './docs/ApiTable.vue'
import type { ComponentDocConfig } from '../config/component-docs'
import { exampleAnchor } from '../config/docs-anchors'
import { docsPackageName } from '../config/constants'

defineProps<{
  component: ComponentDocConfig
}>()

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
      <div class="grid gap-2">
        <h2 class="text-2xl font-semibold tracking-tight">Importación</h2>
        <p class="text-sm leading-6 text-muted-foreground">
          Importa {{ component.title }} desde su entrada pública para usarlo en una vista Vue.
        </p>
      </div>
      <pre
        class="overflow-x-auto rounded-xl border bg-muted/40 p-4 text-sm"
      ><code>import { {{ component.title }} } from '{{ publicImportPath(component.importPath) }}'</code></pre>
    </section>

    <section v-if="component.playground" id="playground" class="grid scroll-mt-8 gap-5">
      <div class="grid gap-2">
        <h2 class="text-2xl font-semibold tracking-tight">Playground</h2>
        <p class="text-sm leading-6 text-muted-foreground">
          Personaliza las props y ejecuta el ejemplo para ver el resultado.
        </p>
      </div>
      <component :is="component.playground" />
    </section>

    <section v-if="!component.playground" id="usage" class="grid scroll-mt-8 gap-5">
      <div class="grid gap-2">
        <h2 class="text-2xl font-semibold tracking-tight">Uso</h2>
        <p class="text-sm leading-6 text-muted-foreground">
          Empieza con el uso básico y configura el componente según las necesidades de tu interfaz.
        </p>
      </div>
      <div class="grid gap-6">
        <div
          v-for="(example, index) in component.usage"
          :id="exampleAnchor('usage', example.title, index)"
          :key="example.title"
          class="scroll-mt-8"
        >
          <component :is="example.component" />
        </div>
      </div>
    </section>

    <section v-if="!component.playground" id="examples" class="grid scroll-mt-8 gap-5">
      <div class="grid gap-2">
        <h2 class="text-2xl font-semibold tracking-tight">Ejemplos</h2>
        <p class="text-sm leading-6 text-muted-foreground">
          Explora las props más habituales con controles interactivos y ejemplos copiable.
        </p>
      </div>
      <div class="grid gap-6">
        <div
          v-for="(example, index) in component.examples"
          :id="exampleAnchor('examples', example.title, index)"
          :key="example.title"
          class="scroll-mt-8"
        >
          <component :is="example.component" />
        </div>
      </div>
    </section>

    <section id="accessibility" class="grid scroll-mt-8 gap-5">
      <div class="grid gap-2">
        <h2 class="text-2xl font-semibold tracking-tight">Accesibilidad</h2>
        <p class="text-sm leading-6 text-muted-foreground">
          Usa las recomendaciones y ejemplos de accesibilidad aplicables a {{ component.title }}.
        </p>
      </div>
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
      <div class="grid gap-2">
        <h2 class="text-2xl font-semibold tracking-tight">API</h2>
        <p class="text-sm leading-6 text-muted-foreground">
          Referencia completa de la API pública de {{ component.title }}, incluidas sus
          configuraciones reutilizables.
        </p>
      </div>

      <div class="grid gap-8">
        <ApiTable
          v-if="component.api.props.length"
          id="props"
          title="Props"
          :rows="component.api.props"
          empty-text="Este componente no define props propias."
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
            :type-label="table.typeLabel"
            :show-default="table.showDefault"
          />
        </template>
        <ApiTable
          v-if="component.api.emits.length"
          id="emits"
          title="Emits"
          :rows="component.api.emits"
          :show-default="false"
          empty-text="Este componente no emite eventos propios."
        />
        <ApiTable
          v-if="component.api.slots.length"
          id="slots"
          title="Slots"
          type-label="slotProps"
          :rows="component.api.slots"
          :show-default="false"
          empty-text="Este componente no define slots."
        />
        <ApiTable
          v-if="component.api.expose.length"
          id="expose"
          title="Expose"
          :rows="component.api.expose"
          :show-default="false"
          empty-text="Este componente no expone métodos."
        />
      </div>
    </section>
  </article>
</template>
