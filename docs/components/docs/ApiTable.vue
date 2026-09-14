<script setup lang="ts">
import type { ApiTableRow } from '../../config/component-docs'

withDefaults(
  defineProps<{
    id?: string
    title: string
    rows: ApiTableRow[]
    emptyText?: string
    typeLabel?: string
    showDefault?: boolean
  }>(),
  {
    id: undefined,
    emptyText: 'No hay elementos definidos.',
    typeLabel: 'Tipo',
    showDefault: true,
  },
)
</script>

<template>
  <section :id="id" class="overflow-hidden rounded-xl border bg-card text-card-foreground">
    <header class="border-b px-4 py-3 sm:px-5">
      <h3 class="font-semibold">{{ title }}</h3>
    </header>

    <div class="overflow-x-auto">
      <table class="w-full min-w-[640px] text-left text-sm">
        <thead class="bg-muted/40 text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            <th class="px-4 py-3 font-medium sm:px-5">Nombre</th>
            <th class="px-4 py-3 font-medium sm:px-5">{{ typeLabel }}</th>
            <th v-if="showDefault" class="px-4 py-3 font-medium sm:px-5">Por defecto</th>
            <th class="px-4 py-3 font-medium sm:px-5">Descripción</th>
          </tr>
        </thead>

        <tbody v-if="rows.length" class="divide-y">
          <tr v-for="row in rows" :key="row.name" class="align-top">
            <td class="px-4 py-3 font-mono text-xs whitespace-nowrap sm:px-5">
              {{ row.name }}<span v-if="row.required" class="text-destructive"> *</span>
            </td>
            <td class="px-4 py-3 sm:px-5">
              <pre
                v-if="row.typePre"
                class="overflow-x-auto rounded bg-muted px-2 py-1 text-xs leading-5 whitespace-pre"
              ><code>{{ row.type }}</code></pre>
              <a
                v-else-if="row.typeLink"
                :href="row.typeLink"
                class="text-primary underline-offset-4 hover:underline"
              >
                <code class="rounded bg-muted px-1.5 py-0.5 text-xs">
                  {{ row.type }}
                </code>
              </a>
              <code v-else class="rounded bg-muted px-1.5 py-0.5 text-xs">
                <template v-for="(part, index) in row.typeParts" :key="`${row.name}-${index}`">
                  <a
                    v-if="part.link"
                    :href="part.link"
                    class="text-primary underline-offset-4 hover:underline"
                  >
                    {{ part.text }}
                  </a>
                  <template v-else>{{ part.text }}</template>
                </template>
                <template v-if="!row.typeParts">{{ row.type }}</template>
              </code>
            </td>
            <td v-if="showDefault" class="px-4 py-3 text-muted-foreground sm:px-5">
              <code v-if="row.default" class="text-xs">{{ row.default }}</code>
              <span v-else>—</span>
            </td>
            <td class="px-4 py-3 text-muted-foreground sm:px-5">{{ row.description }}</td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td :colspan="showDefault ? 4 : 3" class="px-4 py-7 text-center text-muted-foreground">
              {{ emptyText }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
