<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <Button label="Unavailable" disabled />
</template>`
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Use the disabled attribute to prevent interaction with the button."
    :code="code"
    :show-reset="false"
  >
    <Button label="Unavailable" disabled />
  </ComponentExample>
</template>
