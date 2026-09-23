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
  <Popover :content="{ side: 'right', align: 'start', sideOffset: 12, alignOffset: 4, avoidCollisions: true }">
    <Button label="Open content" variant="outline" />
    <template #content><p>Content positioned on the right.</p></template>
  </Popover>
</template>`
</script>

<template>
  <ComponentExample
    title="Content"
    description="Configure the content side, alignment, and offsets."
    :code="code"
    :show-reset="false"
  >
    <Popover
      :content="{
        side: 'right',
        align: 'start',
        sideOffset: 12,
        alignOffset: 4,
        avoidCollisions: true,
      }"
    >
      <Button label="Open content" variant="outline" />
      <template #content><p>Content positioned on the right.</p></template>
    </Popover>
  </ComponentExample>
</template>
