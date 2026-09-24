<script setup lang="ts">
import { Tooltip } from '@/components/ui/Tooltip'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Tooltip } from '__DOCS_PACKAGE__/components/ui/Tooltip'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <Tooltip :delay-duration="500">
    <Button label="Hover or focus" variant="outline" />
    <template #content>Opens after half a second.</template>
  </Tooltip>
</template>`
</script>

<template>
  <ComponentExample
    title="Delay"
    description="Set how long to wait before the tooltip opens."
    :code="code"
    :show-reset="false"
  >
    <Tooltip :delay-duration="500">
      <Button label="Hover or focus" variant="outline" />
      <template #content>Opens after half a second.</template>
    </Tooltip>
  </ComponentExample>
</template>
