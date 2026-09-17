<script setup lang="ts">
import { ref } from 'vue'
import { Masonry } from '@/components/ui/Masonry'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const spacing = ref(2)
const items = ['Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis']
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Masonry } from '@nono-cn/nono-ui/components/ui/Masonry'
${scriptEnd}

const spacing = ref(2)
const items = ['Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis']
${scriptEnd}

<template>
  <Masonry :items="items" :columns="3" :spacing="spacing">
    <template #default="{ item }">
      <div class="rounded-lg border bg-card p-4">{{ item }}</div>
    </template>
  </Masonry>
</template>`
</script>

<template>
  <ComponentExample
    title="Spacing"
    description="Ajusta la separación entre columnas y elementos."
    :code="code"
    @reset="spacing = 2"
  >
    <template #controls>
      <label class="text-sm">
        Espaciado
        <input
          v-model.number="spacing"
          type="number"
          min="0"
          max="8"
          class="ml-2 w-16 rounded-md border px-2 py-1"
        />
      </label>
    </template>
    <Masonry :items="items" :columns="3" :spacing="spacing" class="w-full max-w-xl">
      <template #default="{ item }">
        <div class="rounded-lg border bg-card p-4">{{ item }}</div>
      </template>
    </Masonry>
  </ComponentExample>
</template>
