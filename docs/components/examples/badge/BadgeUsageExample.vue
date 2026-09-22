<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Badge } from '__DOCS_PACKAGE__/components/ui/Badge'
${scriptEnd}

<template>
  <Badge label="Activo" />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Empieza con un badge usando la configuración predeterminada."
    :code="code"
    :show-reset="false"
  >
    <Badge label="Activo" />
  </ComponentExample>
</template>
