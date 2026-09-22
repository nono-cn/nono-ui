<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'
${scriptEnd}

<template>
  <Progress :value="68" :max="100" label="68%" aria-label="Descarga del archivo" />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Muestra el avance actual con una etiqueta visible y un nombre accesible."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-md">
      <Progress :value="68" :max="100" label="68%" aria-label="Descarga del archivo" />
    </div>
  </ComponentExample>
</template>
