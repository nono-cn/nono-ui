<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/Tooltip'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Tooltip } from '__DOCS_PACKAGE__/components/ui/Tooltip'
${scriptEnd}

<template>
  <Tooltip text="Add to library">
    <Button label="Hover me" variant="outline" />
  </Tooltip>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Hover or focus the button to show the tooltip."
    :code="code"
    :show-reset="false"
  >
    <Tooltip text="Add to library">
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </ComponentExample>
</template>
