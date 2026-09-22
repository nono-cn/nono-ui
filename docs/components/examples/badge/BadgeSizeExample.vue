<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Badge } from '@nono-cn/nono-ui/components/ui/Badge'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Badge label="sm" size="sm" />
    <Badge label="md" size="md" />
    <Badge label="lg" size="lg" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Size"
    description="Ajusta el tamaño visual y el espaciado interno del badge."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Badge label="sm" size="sm" />
      <Badge label="md" size="md" />
      <Badge label="lg" size="lg" />
    </div>
  </ComponentExample>
</template>
