<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button label="xs" size="xs" />
    <Button label="sm" size="sm" />
    <Button label="md" size="md" />
    <Button label="lg" size="lg" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Size"
    description="Ajusta el tamaño visual del botón según el espacio y la jerarquía de la interfaz."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Button label="xs" size="xs" />
      <Button label="sm" size="sm" />
      <Button label="md" size="md" />
      <Button label="lg" size="lg" />
    </div>
  </ComponentExample>
</template>
