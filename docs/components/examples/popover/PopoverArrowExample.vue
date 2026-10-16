<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { Popover } from '@/components/ui/Popover'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Popover } from '__DOCS_PACKAGE__/components/ui/Popover'
${scriptEnd}

<template>
  <Popover show-arrow :arrow="{ width: 16, height: 8, rounded: true }">
    <Button label="Open popover" variant="outline" />
    <template #content><p class="text-sm">Custom rounded arrow.</p></template>
  </Popover>
</template>`
</script>

<template>
  <ComponentExample
    title="Arrow"
    description="Show a rounded arrow with a custom size."
    :code="code"
    :show-reset="false"
  >
    <Popover show-arrow :arrow="{ width: 16, height: 8, rounded: true }">
      <Button label="Open popover" variant="outline" />
      <template #content><p class="text-sm">Custom rounded arrow.</p></template>
    </Popover>
  </ComponentExample>
</template>
