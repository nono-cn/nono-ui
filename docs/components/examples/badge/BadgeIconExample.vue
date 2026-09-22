<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Badge } from '__DOCS_PACKAGE__/components/ui/Badge'
${scriptEnd}

<template>
  <Badge label="Verificado" :icon="{ name: 'check' }" />
</template>`
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Añade un icono al inicio del badge."
    :code="code"
    :show-reset="false"
  >
    <Badge label="Verificado" :icon="{ name: 'check' }" />
  </ComponentExample>
</template>
