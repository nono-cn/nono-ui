<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { ButtonGroup } from '__DOCS_PACKAGE__/components/ui/ButtonGroup'
${scriptEnd}

<template>
  <ButtonGroup aria-label="Document actions">
    <Button label="Previous" variant="outline" />
    <Button label="Save" />
    <Button label="Next" variant="outline" />
  </ButtonGroup>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Groups related actions into a single visual unit."
    :code="code"
    :show-reset="false"
  >
    <ButtonGroup aria-label="Document actions">
      <Button label="Previous" variant="outline" />
      <Button label="Save" />
      <Button label="Next" variant="outline" />
    </ButtonGroup>
  </ComponentExample>
</template>
