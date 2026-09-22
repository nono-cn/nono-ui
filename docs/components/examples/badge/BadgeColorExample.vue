<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Badge } from '__DOCS_PACKAGE__/components/ui/Badge'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Badge label="Indigo" color="#6366f1" />
    <Badge label="Verde" color="#22c55e" />
    <Badge label="Naranja" color="#f97316" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="Aplica un color CSS personalizado con contraste calculado."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Badge label="Indigo" color="#6366f1" />
      <Badge label="Verde" color="#22c55e" />
      <Badge label="Naranja" color="#f97316" />
    </div>
  </ComponentExample>
</template>
