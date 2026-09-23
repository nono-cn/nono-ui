<script setup lang="ts">
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Attachment } from '__DOCS_PACKAGE__/components/ui/Attachment'
${scriptEnd}

<template>
  <Attachment
    label="document.pdf"
    description="2.4 MB · PDF"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic file"
    description="Show the main details for a file."
    :code="code"
    :show-reset="false"
  >
    <Attachment label="document.pdf" description="2.4 MB · PDF" />
  </ComponentExample>
</template>
