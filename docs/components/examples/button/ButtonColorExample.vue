<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button label="Indigo" color="#6366f1" />
    <Button label="Verde" color="#22c55e" />
    <Button label="Naranja" color="#f97316" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="Aplica un color CSS personalizado al tratamiento visual del botón."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Button label="Indigo" color="#6366f1" />
      <Button label="Verde" color="#22c55e" />
      <Button label="Naranja" color="#f97316" />
    </div>
  </ComponentExample>
</template>
