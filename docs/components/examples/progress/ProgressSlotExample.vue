<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Progress } from '@nono-cn/nono-ui/components/ui/Progress'
${scriptEnd}

<template>
  <Progress :value="72">
    <template #label="{ percentage }">
      {{ Math.round(percentage) }}%
    </template>
  </Progress>
</template>`
</script>

<template>
  <ComponentExample
    title="Slot label"
    description="Usa el contexto del slot para construir una etiqueta dinámica con el porcentaje calculado."
    :code="code"
    :show-reset="false"
  >
    <Progress class="w-full max-w-md" :value="72">
      <template #label="{ percentage }">{{ Math.round(percentage) }}%</template>
    </Progress>
  </ComponentExample>
</template>
