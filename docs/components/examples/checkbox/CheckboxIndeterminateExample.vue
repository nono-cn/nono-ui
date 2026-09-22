<script setup lang="ts">
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
const code = `<script setup lang="ts">
import { Checkbox } from '@nono-cn/nono-ui/components/ui/Checkbox'
<\/script>
<template>
  <Checkbox value="indeterminate" aria-label="Selección parcial" />
</template>`
</script>
<template>
  <ComponentExample
    title="Indeterminate"
    description="Representa una selección parcial."
    :code="code"
    :show-reset="false"
    ><Checkbox value="indeterminate" aria-label="Selección parcial"
  /></ComponentExample>
</template>
