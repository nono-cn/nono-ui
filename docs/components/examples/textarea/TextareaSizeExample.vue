<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@/components/ui/Textarea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
const value = ref('Texto de ejemplo')

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@nono-cn/nono-ui/components/ui/Textarea'

const size = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
const value = ref('Texto de ejemplo')
${scriptEnd}

<template>
  <Textarea v-model:value="value" :size="size" />
</template>`
</script>

<template>
  <ComponentExample
    title="Tamaños"
    description="Elige el tamaño del campo de texto."
    :code="code"
    @reset="size = 'md'"
  >
    <template #controls>
      <label class="flex items-center gap-2 text-sm">
        size
        <select v-model="size" class="rounded-md border bg-background px-2 py-1.5">
          <option v-for="value in ['xs', 'sm', 'md', 'lg', 'xl']" :key="value" :value="value">
            {{ value }}
          </option>
        </select>
      </label>
    </template>
    <Textarea value="Texto de ejemplo" :size="size" aria-label="Textarea con tamaño configurable" />
  </ComponentExample>
</template>
