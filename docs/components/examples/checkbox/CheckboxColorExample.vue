<script setup lang="ts">
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
const code = `<script setup lang="ts">
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'
<\/script>
<template>
  <Checkbox :value="true" color="#8b5cf6" aria-label="Color personalizado" />
</template>`
</script>
<template>
  <ComponentExample
    title="Color"
    description="Aplica un color CSS personalizado."
    :code="code"
    :show-reset="false"
    ><Checkbox :value="true" color="#8b5cf6" aria-label="Color personalizado"
  /></ComponentExample>
</template>
