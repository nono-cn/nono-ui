<script setup lang="ts">
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const code = `<script setup lang="ts">
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'
${scriptEnd}
<template>
  <Checkbox
    value="indeterminate"
    :icon="{ name: 'plus' }"
    :indeterminate-icon="{ name: 'x' }"
    aria-label="Custom icons"
  />
</template>`
</script>
<template>
  <ComponentExample
    title="Icon and indeterminateIcon"
    description="Customize both icons."
    :code="code"
    :show-reset="false"
    ><Checkbox
      value="indeterminate"
      :icon="{ name: 'plus' }"
      :indeterminate-icon="{ name: 'x' }"
      aria-label="Custom icons"
  /></ComponentExample>
</template>
