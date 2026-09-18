<script setup lang="ts">
import { computed, ref } from 'vue'
import { Switch } from '@/components/ui/Switch'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialValue = 'off'
const value = ref(initialValue)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@nono-cn/nono-ui/components/ui/Switch'

const value = ref<'on' | 'off'>('${value.value}')
${scriptEnd}

<template>
  <Switch v-model:value="value" true-value="on" false-value="off" aria-label="Estado" />
</template>`,
)

function reset() {
  value.value = initialValue
}
</script>

<template>
  <ComponentExample
    title="Valores personalizados"
    description="Usa trueValue y falseValue para valores no booleanos."
    :code="code"
    @reset="reset"
  >
    <div class="flex items-center gap-3">
      <Switch v-model:value="value" true-value="on" false-value="off" aria-label="Estado" /><span
        class="text-sm text-muted-foreground"
        >{{ value }}</span
      >
    </div>
  </ComponentExample>
</template>
