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
  <Dialog label="Edit profile" description="Update your account details.">
    <Button label="Edit profile" variant="outline" />
    <template #content><p>Change your name and email address.</p></template>
    <template #footer="{ close }">
      <Button label="Save changes" @click="close" />
    </template>
  </Dialog>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic dialog"
    description="Open a dialog with a title, description, body, and action."
    :code="code"
    :show-reset="false"
  >
    <Dialog label="Edit profile" description="Update your account details.">
      <Button label="Edit profile" variant="outline" />
      <template #content><p>Change your name and email address.</p></template>
      <template #footer="{ close }">
        <Button label="Save changes" @click="close" />
      </template>
    </Dialog>
  </ComponentExample>
</template>
