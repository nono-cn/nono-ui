<script setup lang="ts">
import ApiTable from './docs/ApiTable.vue'
import type { ComponentDocConfig } from '../config/component-docs'

defineProps<{
  component: ComponentDocConfig
}>()
</script>

<template>
  <article class="docs-page mx-auto grid max-w-4xl gap-12 px-5 py-10 sm:px-8 sm:py-14">
    <header id="overview" class="grid scroll-mt-8 gap-4">
      <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">{{ component.title }}</h1>
      <p class="max-w-2xl text-base leading-7 text-muted-foreground">
        {{ component.description }}
      </p>
    </header>

    <section id="import" class="grid scroll-mt-8 gap-5">
      <div class="grid gap-2">
        <h2 class="text-2xl font-semibold tracking-tight">Import</h2>
        <p class="text-sm leading-6 text-muted-foreground">
          Importa {{ component.title }} desde su entrada pública para usarlo en una vista Vue.
        </p>
      </div>
      <pre
        class="overflow-x-auto rounded-xl border bg-muted/40 p-4 text-sm"
      ><code>import { {{ component.title }} } from '{{ component.importPath }}'</code></pre>
    </section>

    <section id="usage" class="grid scroll-mt-8 gap-5">
      <div class="grid gap-2">
        <h2 class="text-2xl font-semibold tracking-tight">Usage</h2>
        <p class="text-sm leading-6 text-muted-foreground">
          Empieza con el uso básico y configura el componente según las necesidades de tu interfaz.
        </p>
      </div>
      <div class="grid gap-6">
        <component
          :is="example.component"
          v-for="example in component.usage"
          :key="example.title"
        />
      </div>
    </section>

    <section id="examples" class="grid scroll-mt-8 gap-5">
      <div class="grid gap-2">
        <h2 class="text-2xl font-semibold tracking-tight">Examples</h2>
        <p class="text-sm leading-6 text-muted-foreground">
          Explora las props más habituales con controles interactivos y ejemplos copiable.
        </p>
      </div>
      <div class="grid gap-6">
        <component
          :is="example.component"
          v-for="example in component.examples"
          :key="example.title"
        />
      </div>
    </section>

    <section id="accessibility" class="grid scroll-mt-8 gap-5">
      <div class="grid gap-2">
        <h2 class="text-2xl font-semibold tracking-tight">Accessibility</h2>
        <p class="text-sm leading-6 text-muted-foreground">
          Usa Icon como elemento decorativo por defecto y configura un nombre accesible cuando el
          icono comunique información por sí mismo.
        </p>
      </div>
      <div class="grid gap-6">
        <component
          :is="example.component"
          v-for="example in component.accessibility"
          :key="example.title"
        />
      </div>
    </section>

    <section id="api" class="grid scroll-mt-8 gap-5">
      <div class="grid gap-2">
        <h2 class="text-2xl font-semibold tracking-tight">API</h2>
        <p class="text-sm leading-6 text-muted-foreground">
          Referencia completa de las propiedades, eventos, slots y tipos públicos de
          {{ component.title }}.
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
