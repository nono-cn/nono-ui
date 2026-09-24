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
  <Tooltip :show-arrow="true" :arrow="{ width: 12, height: 6, class: 'fill-white' }">
    <Button label="More information" variant="outline" />
    <template #content>This tooltip includes an arrow.</template>
  </Tooltip>
</template>`
</script>

<template>
  <ComponentExample
    title="Arrow"
    description="Show and size the optional arrow through its configuration."
    :code="code"
    :show-reset="false"
  >
    <Tooltip :show-arrow="true" :arrow="{ width: 12, height: 6, class: 'fill-white' }">
      <Button label="More information" variant="outline" />
      <template #content>This tooltip includes an arrow.</template>
    </Tooltip>
  </ComponentExample>
</template>
