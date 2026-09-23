<script setup lang="ts">
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const code = `<script setup lang="ts">
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'
${scriptEnd}
<template>
  <Checkbox :value="true" color="#8b5cf6" aria-label="Custom color" />
</template>`
</script>
<template>
  <ComponentExample
    title="Color"
    description="Use a custom CSS color."
    :code="code"
    :show-reset="false"
    ><Checkbox :value="true" color="#8b5cf6" aria-label="Custom color"
  /></ComponentExample>
</template>
