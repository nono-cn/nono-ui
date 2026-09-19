<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const checked = ref(true)
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@nono-cn/nono-ui/components/ui/Checkbox'

const checked = ref(true)
${scriptEnd}

<template>
  <Checkbox v-model:value="checked" color="#8b5cf6" aria-label="Color" />
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="Aplica un color CSS personalizado con prioridad sobre severity."
    :code="code"
    :show-reset="false"
  >
    <Checkbox v-model:value="checked" color="#8b5cf6" aria-label="Color" />
  </ComponentExample>
</template>
