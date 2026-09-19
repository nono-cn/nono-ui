<script setup lang="ts">
import { Textarea } from '@/components/ui/Textarea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Textarea } from '@nono-cn/nono-ui/components/ui/Textarea'
${scriptEnd}

<template>
  <Textarea value="Escribe una descripción..." aria-label="Descripción" />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Un campo de texto multilínea."
    :code="code"
    :show-reset="false"
  >
    <Textarea value="Escribe una descripción..." aria-label="Descripción" />
  </ComponentExample>
</template>
