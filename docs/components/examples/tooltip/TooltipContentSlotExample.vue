<script setup lang="ts">
import { Button } from '@/components/Button'
import { Kbd } from '@/components/Kbd'
import { Tooltip } from '@/components/Tooltip'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/Button'
import { Kbd } from '__DOCS_PACKAGE__/components/Kbd'
import { Tooltip } from '__DOCS_PACKAGE__/components/Tooltip'
${scriptEnd}

<template>
  <Tooltip>
    <Button label="Save" variant="outline" />
    <template #content>
      <div class="flex items-center gap-2">
        <span>Save changes</span>
        <Kbd label="Ctrl S" />
      </div>
    </template>
  </Tooltip>
</template>`
</script>

<template>
  <ComponentExample
    title="Content slot"
    description="Render rich content such as a keyboard shortcut."
    :code="code"
    :show-reset="false"
  >
    <Tooltip>
      <Button label="Save" variant="outline" />
      <template #content>
        <div class="flex items-center gap-2">
          <span>Save changes</span>
          <Kbd label="Ctrl S" />
        </div>
      </template>
    </Tooltip>
  </ComponentExample>
</template>
