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
  <div class="flex flex-wrap items-center gap-4">
    <Tooltip :disable-hoverable-content="true">
      <Button label="Disable hoverable content" variant="outline" />
      <template #content>Closes when the pointer leaves the trigger.</template>
    </Tooltip>

    <Tooltip :disable-closing-trigger="true">
      <Button label="Keep open on activation" variant="outline" />
      <template #content>Activating the trigger does not close this tooltip.</template>
    </Tooltip>

    <Tooltip :disabled="true">
      <Button label="Disabled tooltip" variant="outline" />
      <template #content>This tooltip will not open.</template>
    </Tooltip>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Compare the Tooltip root options for hoverable content, trigger activation, and disabling."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-4">
      <Tooltip :disable-hoverable-content="true">
        <Button label="Disable hoverable content" variant="outline" />
        <template #content>Closes when the pointer leaves the trigger.</template>
      </Tooltip>

      <Tooltip :disable-closing-trigger="true">
        <Button label="Keep open on activation" variant="outline" />
        <template #content>Activating the trigger does not close this tooltip.</template>
      </Tooltip>

      <Tooltip :disabled="true">
        <Button label="Disabled tooltip" variant="outline" />
        <template #content>This tooltip will not open.</template>
      </Tooltip>
    </div>
  </ComponentExample>
</template>
