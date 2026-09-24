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
  <Tooltip>
    <Button label="Save" variant="outline" />
    <template #content>Save your changes.</template>
  </Tooltip>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic tooltip"
    description="Show a short hint when the trigger receives focus or hover."
    :code="code"
    :show-reset="false"
  >
    <Tooltip>
      <Button label="Save" variant="outline" />
      <template #content>Save your changes.</template>
    </Tooltip>
  </ComponentExample>
</template>
