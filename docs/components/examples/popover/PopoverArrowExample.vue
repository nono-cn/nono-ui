<script setup lang="ts">
import { Popover } from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Popover } from '__DOCS_PACKAGE__/components/ui/Popover'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <Popover :show-arrow="true" :arrow="{ width: 16, height: 8, rounded: true }">
    <Button label="Show arrow" />
    <template #content><p>Rounded, custom arrow.</p></template>
  </Popover>
</template>`
</script>

<template>
  <ComponentExample
    title="Arrow"
    description="Customize width, height, and rounded."
    :code="code"
    :show-reset="false"
  >
    <Popover :show-arrow="true" :arrow="{ width: 16, height: 8, rounded: true }">
      <Button label="Show arrow" />
      <template #content><p>Rounded, custom arrow.</p></template>
    </Popover>
  </ComponentExample>
</template>
