<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@/components/ui/Textarea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const highlight = ref(true)
const value = ref('El borde permanece resaltado sin foco.')

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@nono-cn/nono-ui/components/ui/Textarea'

const highlight = ref(true)
const value = ref('El borde permanece resaltado sin foco.')
${scriptEnd}

<template>
  <Textarea v-model:value="value" severity="error" :highlight="highlight" />
</template>`
</script>

<template>
  <ComponentExample
    title="Highlight"
    description="Mantén el borde con el color semántico aunque el campo no tenga el foco."
    :code="code"
    @reset="highlight = true"
  >
    <template #controls>
      <label class="flex items-center gap-2 text-sm">
        <input v-model="highlight" type="checkbox" />
        highlight
      </label>
    </template>
    <Textarea
      v-model:value="value"
      severity="error"
      :highlight="highlight"
      aria-label="Textarea resaltado"
    />
  </ComponentExample>
</template>
