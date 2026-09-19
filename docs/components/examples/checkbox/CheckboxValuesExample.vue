<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialValue = 'off'
const value = ref(initialValue)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@nono-cn/nono-ui/components/ui/Checkbox'

const value = ref<'on' | 'off'>('${value.value}')
${scriptEnd}

<template>
  <Checkbox v-model:value="value" true-value="on" false-value="off" aria-label="Estado" />
</template>`,
)

function reset() {
  value.value = initialValue
}
</script>

<template>
  <ComponentExample
    title="Valores personalizados"
    description="Usa trueValue y falseValue para representar estados con valores propios."
    :code="code"
    @reset="reset"
  >
    <div class="flex items-center gap-3">
      <Checkbox v-model:value="value" true-value="on" false-value="off" aria-label="Estado" />
      <span class="text-sm text-muted-foreground">{{ value }}</span>
    </div>
  </ComponentExample>
</template>
