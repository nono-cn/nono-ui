<script setup lang="ts">
import { Bubble } from '@/components/ui/Bubble'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Bubble } from '@nono-cn/nono-ui/components/ui/Bubble'
<\/script>

<template>
  <Bubble color="#8b5cf6">Burbuja con color personalizado</Bubble>
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="Usa un color CSS personalizado."
    :code="code"
    :show-reset="false"
  >
    <Bubble color="#8b5cf6">Burbuja con color personalizado</Bubble>
  </ComponentExample>
</template>
