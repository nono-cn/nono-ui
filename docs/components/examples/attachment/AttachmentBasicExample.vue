<script setup lang="ts">
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Attachment } from '__DOCS_PACKAGE__/components/ui/Attachment'
<\/script>

<template>
  <Attachment
    label="documento.pdf"
    description="2,4 MB · PDF"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Archivo básico"
    description="Presenta la información principal de un archivo."
    :code="code"
    :show-reset="false"
  >
    <Attachment label="documento.pdf" description="2,4 MB · PDF" />
  </ComponentExample>
</template>
