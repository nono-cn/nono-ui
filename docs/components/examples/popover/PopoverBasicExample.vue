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
  <Popover>
    <Button label="Open popover" />
    <template #content><p>Contextual content.</p></template>
  </Popover>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic popover"
    description="Show content related to a button."
    :code="code"
    :show-reset="false"
  >
    <Popover>
      <Button label="Open popover" />
      <template #content><p>Contextual content.</p></template>
    </Popover>
  </ComponentExample>
</template>
