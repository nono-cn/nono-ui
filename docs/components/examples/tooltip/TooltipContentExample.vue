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
  <Tooltip :content="{ side: 'right', align: 'start', sideOffset: 8 }">
    <Button label="Share" variant="outline" />
    <template #content>Copy a link to share this page.</template>
  </Tooltip>
</template>`
</script>

<template>
  <ComponentExample
    title="Content"
    description="Configure the content side, alignment, and offset."
    :code="code"
    :show-reset="false"
  >
    <Tooltip :content="{ side: 'right', align: 'start', sideOffset: 8 }">
      <Button label="Share" variant="outline" />
      <template #content>Copy a link to share this page.</template>
    </Tooltip>
  </ComponentExample>
</template>
