<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Popover } from '@/components/ui/Popover'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const open = ref(false)
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Popover } from '__DOCS_PACKAGE__/components/ui/Popover'

const open = ref(false)
${scriptEnd}

<template>
  <div class="flex items-center gap-4">
    <Button :label="open ? 'Close' : 'Open'" type="button" @click="open = !open" />
    <Popover v-model:open="open">
      <Button label="Anchor" variant="outline" />
      <template #content><p class="text-sm">Controlled popover content.</p></template>
    </Popover>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Controlled state"
    description="Toggle the popover with a separate button."
    :code="code"
    :show-reset="false"
  >
    <div class="flex items-center gap-4">
      <Button :label="open ? 'Close' : 'Open'" type="button" @click="open = !open" />
      <Popover v-model:open="open">
        <Button label="Anchor" variant="outline" />
        <template #content><p class="text-sm">Controlled popover content.</p></template>
      </Popover>
    </div>
  </ComponentExample>
</template>
