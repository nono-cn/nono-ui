<script setup lang="ts">
import { Button } from '@/components/Button'
import { Popover } from '@/components/Popover'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/Button'
import { Popover } from '__DOCS_PACKAGE__/components/Popover'
${scriptEnd}

<template>
  <Popover>
    <Button label="Open popover" variant="outline" />
    <template #content="{ close }">
      <div class="flex flex-col gap-3">
        <p class="text-sm">Popovers show rich content anchored to a trigger.</p>
        <Button label="Got it" size="sm" @click="close" />
      </div>
    </template>
  </Popover>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Click the button to open the popover and close it from the content slot."
    :code="code"
    :show-reset="false"
  >
    <Popover>
      <Button label="Open popover" variant="outline" />
      <template #content="{ close }">
        <div class="flex flex-col gap-3">
          <p class="text-sm">Popovers show rich content anchored to a trigger.</p>
          <Button label="Got it" size="sm" @click="close" />
        </div>
      </template>
    </Popover>
  </ComponentExample>
</template>
