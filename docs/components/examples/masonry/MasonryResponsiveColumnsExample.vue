<script setup lang="ts">
import { Masonry } from '@/components/ui/Masonry'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = ['Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis']
const columns = { sm: 1, md: 2, lg: 3 }
const code = `<script setup lang="ts">
import { Masonry } from '@nono-cn/nono-ui/components/ui/Masonry'
${scriptEnd}

const items = ['Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis']
const columns = { sm: 1, md: 2, lg: 3 }
${scriptEnd}

<template>
  <Masonry :items="items" :columns="columns">
    <template #default="{ item }"><div class="rounded-lg border bg-card p-4">{{ item }}</div></template>
  </Masonry>
</template>`
</script>

<template>
  <ComponentExample
    title="Responsive columns"
    description="El número de columnas cambia según el breakpoint del viewport."
    :code="code"
    :show-reset="false"
  >
    <Masonry :items="items" :columns="columns" class="w-full max-w-xl">
      <template #default="{ item }">
        <div class="rounded-lg border bg-card p-4">{{ item }}</div>
      </template>
    </Masonry>
  </ComponentExample>
</template>
