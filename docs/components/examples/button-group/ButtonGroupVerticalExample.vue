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
  <ButtonGroup orientation="vertical" aria-label="Quick actions">
    <Button label="Edit" />
    <Button label="Duplicate" variant="outline" />
    <Button label="Delete" variant="outline" severity="error" />
  </ButtonGroup>
</template>`
</script>

<template>
  <ComponentExample
    title="Vertical"
    description="Stacks related actions vertically."
    :code="code"
    :show-reset="false"
  >
    <ButtonGroup orientation="vertical" aria-label="Quick actions">
      <Button label="Edit" />
      <Button label="Duplicate" variant="outline" />
      <Button label="Delete" variant="outline" severity="error" />
    </ButtonGroup>
  </ComponentExample>
</template>
