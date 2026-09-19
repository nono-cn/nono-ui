<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialValue = 'indeterminate' as const
const value = ref<boolean | 'indeterminate'>(initialValue)
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@nono-cn/nono-ui/components/ui/Checkbox'

const value = ref<boolean | 'indeterminate'>('indeterminate')
${scriptEnd}

<template>
  <Checkbox v-model:value="value" aria-label="Selección parcial" />
</template>`

function reset() {
  value.value = initialValue
}
</script>

<template>
  <ComponentExample
    title="Estado indeterminado"
    description="Representa una selección parcial con el valor indeterminate."
    :code="code"
    @reset="reset"
  >
    <div class="flex items-center gap-3">
      <Checkbox v-model:value="value" aria-label="Selección parcial" />
      <span class="text-sm text-muted-foreground">{{ value }}</span>
    </div>
  </ComponentExample>
</template>
