<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const checked = ref(false)
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@nono-cn/nono-ui/components/ui/Checkbox'

const checked = ref(false)
${scriptEnd}

<template>
  <label class="flex items-center gap-2 text-sm">
    <Checkbox v-model:value="checked" aria-label="Aceptar términos" />
    Aceptar términos
  </label>
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Controla un valor booleano con v-model:value."
    :code="code"
    @reset="checked = false"
  >
    <label class="flex items-center gap-2 text-sm">
      <Checkbox v-model:value="checked" aria-label="Aceptar términos" />
      Aceptar términos
    </label>
  </ComponentExample>
</template>
