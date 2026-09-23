<script setup lang="ts">
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const code = `<script setup lang="ts">
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'
${scriptEnd}
<template>
  <Checkbox value="indeterminate" aria-label="Partial selection" />
</template>`
</script>
<template>
  <ComponentExample
    title="Indeterminate"
    description="Represent a partial selection."
    :code="code"
    :show-reset="false"
    ><Checkbox value="indeterminate" aria-label="Partial selection"
  /></ComponentExample>
</template>
