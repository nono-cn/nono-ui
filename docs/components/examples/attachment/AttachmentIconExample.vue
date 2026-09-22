<script setup lang="ts">
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Attachment } from '@nono-cn/nono-ui/components/ui/Attachment'
<\/script>

<template>
  <Attachment label="documento.pdf" description="2,4 MB · PDF" :icon="{ name: 'fileText' }" />
</template>`
</script>

<template>
  <ComponentExample
    title="Icono"
    description="Identifica el tipo de archivo con un icono."
    :code="code"
    :show-reset="false"
  >
    <Attachment label="documento.pdf" description="2,4 MB · PDF" :icon="{ name: 'fileText' }" />
  </ComponentExample>
</template>
