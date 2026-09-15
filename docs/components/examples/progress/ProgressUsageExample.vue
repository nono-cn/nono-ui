<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Progress } from '@nono-cn/nono-ui/components/ui/Progress'
${scriptEnd}

<template>
  <Progress :value="65" />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Muestra el progreso actual sobre el máximo predeterminado de 100."
    :code="code"
    :show-reset="false"
  >
    <Progress class="w-full max-w-md" :value="65" />
  </ComponentExample>
</template>
