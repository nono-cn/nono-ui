<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <Button label="Save" :icon="{ name: 'save' }" />
</template>`
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Add an icon before the button’s main content."
    :code="code"
    :show-reset="false"
  >
    <Button label="Save" :icon="{ name: 'save' }" />
  </ComponentExample>
</template>
