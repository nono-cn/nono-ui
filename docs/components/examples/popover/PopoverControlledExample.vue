<script setup lang="ts">
import { ref } from 'vue'
import { Popover } from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const open = ref(false)
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Popover } from '__DOCS_PACKAGE__/components/ui/Popover'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const open = ref(false)
${scriptEnd}

<template>
  <Popover v-model:open="open">
    <Button :label="open ? 'Close' : 'Open'" />
    <template #content><p>State: {{ open ? 'open' : 'closed' }}</p></template>
  </Popover>
</template>`
</script>

<template>
  <ComponentExample
    title="Controlled state"
    description="Sync the state with v-model:open."
    :code="code"
    :show-reset="false"
  >
    <Popover v-model:open="open">
      <Button :label="open ? 'Close' : 'Open'" />
      <template #content
        ><p>State: {{ open ? 'open' : 'closed' }}</p></template
      >
    </Popover>
  </ComponentExample>
</template>
