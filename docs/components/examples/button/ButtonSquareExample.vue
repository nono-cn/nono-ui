<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button :icon="{ name: 'plus' }" square aria-label="Add item" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Square"
    description="Set equal width and height to create square buttons, typically with an icon."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Button :icon="{ name: 'plus' }" square aria-label="Add item" />
    </div>
  </ComponentExample>
</template>
