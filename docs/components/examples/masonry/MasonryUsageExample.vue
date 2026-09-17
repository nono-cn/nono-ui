<script setup lang="ts">
import { Masonry } from '@/components/ui/Masonry'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = ['Diseño', 'Vue', 'Tailwind', 'Masonry', 'Nono UI']
const code = `<script setup lang="ts">
import { Masonry } from '@nono-cn/nono-ui/components/ui/Masonry'
${scriptEnd}

const items = ['Diseño', 'Vue', 'Tailwind', 'Masonry', 'Nono UI']
${scriptEnd}

<template>
  <Masonry :items="items" :columns="3">
    <template #default="{ item }">
      <article class="rounded-lg border bg-card p-4 shadow-sm">
        <p class="font-medium">{{ item }}</p>
      </article>
    </template>
  </Masonry>
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Renderiza una colección usando el slot default scoped."
    :code="code"
    :show-reset="false"
  >
    <Masonry :items="items" :columns="3" class="w-full max-w-xl">
      <template #default="{ item }">
        <article class="rounded-lg border bg-card p-4 shadow-sm">
          <p class="font-medium">{{ item }}</p>
        </article>
      </template>
    </Masonry>
  </ComponentExample>
</template>
