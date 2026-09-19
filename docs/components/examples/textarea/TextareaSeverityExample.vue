<script setup lang="ts">
import { ref } from 'vue'
import { Textarea, type TextareaProps } from '@/components/ui/Textarea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const severity = ref<NonNullable<TextareaProps['severity']>>('primary')
const value = ref('Texto de ejemplo')

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Textarea, type TextareaProps } from '@nono-cn/nono-ui/components/ui/Textarea'

const severity = ref<NonNullable<TextareaProps['severity']>>('primary')
const value = ref('Texto de ejemplo')
${scriptEnd}

<template>
  <Textarea v-model:value="value" :severity="severity" />
</template>`
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Elige el color semántico del foco."
    :code="code"
    @reset="severity = 'primary'"
  >
    <template #controls>
      <label class="flex items-center gap-2 text-sm">
        severity
        <select v-model="severity" class="rounded-md border bg-background px-2 py-1.5">
          <option
            v-for="value in ['primary', 'secondary', 'error', 'warning', 'success']"
            :key="value"
            :value="value"
          >
            {{ value }}
          </option>
        </select>
      </label>
    </template>
    <Textarea v-model:value="value" :severity="severity" aria-label="Severity" />
  </ComponentExample>
</template>
