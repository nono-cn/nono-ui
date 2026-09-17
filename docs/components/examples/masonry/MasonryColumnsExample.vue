<script setup lang="ts">
import { ref } from 'vue'
import { Masonry } from '@/components/ui/Masonry'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const columns = ref(3)
const items = ['Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis']
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Masonry } from '@nono-cn/nono-ui/components/ui/Masonry'
${scriptEnd}

const columns = ref(3)
const items = ['Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis']
${scriptEnd}

<template>
  <Masonry :items="items" :columns="columns">
    <template #default="{ item }"><div class="rounded-lg border p-4">{{ item }}</div></template>
  </Masonry>
</template>`
</script>

<template>
  <ComponentExample
    title="Columns"
    description="Controla el número de columnas del layout."
    :code="code"
    @reset="columns = 3"
  >
    <template #controls
      ><label class="text-sm"
        >Columnas
        <input
          v-model.number="columns"
          type="number"
          min="1"
          max="6"
          class="ml-2 w-16 rounded-md border px-2 py-1" /></label
    ></template>
    <Masonry :items="items" :columns="columns" class="w-full max-w-xl">
      <template #default="{ item }"
        ><div class="rounded-lg border bg-card p-4">{{ item }}</div></template
      >
    </Masonry>
  </ComponentExample>
</template>
