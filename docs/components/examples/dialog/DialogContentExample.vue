<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Dialog } from '__DOCS_PACKAGE__/components/ui/Dialog'
${scriptEnd}

<template>
  <Dialog
    label="Share project"
    description="Invite someone to collaborate on this project."
    :content="{ id: 'share-project-dialog', class: 'sm:max-w-md' }"
  >
    <Button label="Share project" variant="outline" />
    <template #content><p>Copy the project link and send it to a teammate.</p></template>
  </Dialog>
</template>`
</script>

<template>
  <ComponentExample
    title="Content configuration"
    description="Pass DialogContent attributes and classes through the content prop."
    :code="code"
    :show-reset="false"
  >
    <Dialog
      label="Share project"
      description="Invite someone to collaborate on this project."
      :content="{ id: 'share-project-dialog', class: 'sm:max-w-md' }"
    >
      <Button label="Share project" variant="outline" />
      <template #content><p>Copy the project link and send it to a teammate.</p></template>
    </Dialog>
  </ComponentExample>
</template>
