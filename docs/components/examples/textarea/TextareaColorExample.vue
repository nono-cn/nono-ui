<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@/components/ui/Textarea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const color = ref('#7c3aed')
const value = ref('Color personalizado')

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@nono-cn/nono-ui/components/ui/Textarea'

const color = ref('#7c3aed')
const value = ref('Color personalizado')
${scriptEnd}

<template>
  <Textarea v-model:value="value" severity="error" :color="color" />
</template>`
</script>

<template>
  <ComponentExample
    title="Color personalizado"
    description="El color personalizado sobreescribe severity."
    :code="code"
    @reset="color = '#7c3aed'"
  >
    <template #controls>
      <label class="flex items-center gap-2 text-sm">
        color
        <input
          v-model="color"
          type="text"
          class="w-32 rounded-md border bg-background px-2 py-1.5"
        />
      </label>
    </template>
    <Textarea
      v-model:value="value"
      severity="error"
      :color="color"
      aria-label="Color personalizado"
    />
  </ComponentExample>
</template>
