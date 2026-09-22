<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'

const value = ref<'yes' | 'no'>('no')
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'

const value = ref<'yes' | 'no'>('no')
<\/script>

<template>
  <Checkbox
    v-model:value="value"
    true-value="yes"
    false-value="no"
    aria-label="Aceptar"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="trueValue y falseValue"
    description="Usa valores propios en v-model:value."
    :code="code"
    :show-reset="false"
  >
    <div class="flex items-center gap-3">
      <Checkbox
        v-model:value="value"
        true-value="yes"
        false-value="no"
        aria-label="Aceptar"
      /><span>{{ value }}</span>
    </div>
  </ComponentExample>
</template>
