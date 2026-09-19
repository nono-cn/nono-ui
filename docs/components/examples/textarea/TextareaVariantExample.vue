<script setup lang="ts">
import { ref } from 'vue'
import { Textarea, type TextareaProps } from '@/components/ui/Textarea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variant = ref<NonNullable<TextareaProps['variant']>>('outline')
const value = ref('Texto de ejemplo')

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Textarea, type TextareaProps } from '@nono-cn/nono-ui/components/ui/Textarea'

const variant = ref<NonNullable<TextareaProps['variant']>>('outline')
const value = ref('Texto de ejemplo')
${scriptEnd}

<template>
  <Textarea v-model:value="value" :variant="variant" />
</template>`
</script>

<template>
  <ComponentExample
    title="Variantes"
    description="Elige el estilo del borde y del fondo. none elimina el borde al enfocar."
    :code="code"
    @reset="variant = 'outline'"
  >
    <template #controls>
      <label class="flex items-center gap-2 text-sm">
        variant
        <select v-model="variant" class="rounded-md border bg-background px-2 py-1.5">
          <option
            v-for="value in ['outline', 'subtle', 'soft', 'plain', 'none']"
            :key="value"
            :value="value"
          >
            {{ value }}
          </option>
        </select>
      </label>
    </template>
    <Textarea v-model:value="value" :variant="variant" aria-label="Variante" />
  </ComponentExample>
</template>
