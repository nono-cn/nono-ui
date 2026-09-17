<script setup lang="ts">
import { ref } from 'vue'
import { Masonry } from '@/components/ui/Masonry'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const sequential = ref(false)
const items = [
  { label: 'Corto', class: 'h-20' },
  { label: 'Largo', class: 'h-40' },
  { label: 'Medio', class: 'h-28' },
  { label: 'Otro corto', class: 'h-24' },
  { label: 'Otro largo', class: 'h-36' },
  { label: 'Final', class: 'h-16' },
]
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Masonry } from '@nono-cn/nono-ui/components/ui/Masonry'
${scriptEnd}

const sequential = ref(false)
const items = [/* ... */]
${scriptEnd}

<template>
  <Masonry :items="items" :columns="3" :sequential="sequential">
    <template #default="{ item }"><div :class="item.class">{{ item.label }}</div></template>
  </Masonry>
</template>`
</script>

<template>
  <ComponentExample
    title="Sequential"
    description="Alterna entre reparto por columna más corta y reparto secuencial."
    :code="code"
    @reset="sequential = false"
  >
    <template #controls
      ><label class="flex items-center gap-2 text-sm"
        ><input v-model="sequential" type="checkbox" /> Secuencial</label
      ></template
    >
    <Masonry :items="items" :columns="3" :sequential="sequential" class="w-full max-w-xl">
      <template #default="{ item }"
        ><div class="rounded-lg border bg-card p-4" :class="item.class">
          {{ item.label }}
        </div></template
      >
    </Masonry>
  </ComponentExample>
</template>
