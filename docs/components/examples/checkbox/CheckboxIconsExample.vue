<script setup lang="ts">
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
const code = `<script setup lang="ts">
import { Checkbox } from '@nono-cn/nono-ui/components/ui/Checkbox'
<\/script>
<template>
  <Checkbox
    value="indeterminate"
    :icon="{ name: 'plus' }"
    :indeterminate-icon="{ name: 'x' }"
    aria-label="Iconos personalizados"
  />
</template>`
</script>
<template>
  <ComponentExample
    title="Icon e indeterminateIcon"
    description="Personaliza ambos iconos."
    :code="code"
    :show-reset="false"
    ><Checkbox
      value="indeterminate"
      :icon="{ name: 'plus' }"
      :indeterminate-icon="{ name: 'x' }"
      aria-label="Iconos personalizados"
  /></ComponentExample>
</template>
