<script setup lang="ts">
import { Popover } from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Popover } from '@nono-cn/nono-ui/components/ui/Popover'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
<\/script>

<template>
  <Popover>
    <Button label="Abrir popover" />
    <template #content><p>Contenido contextual.</p></template>
  </Popover>
</template>`
</script>

<template>
  <ComponentExample
    title="Popover básico"
    description="Muestra contenido relacionado con un botón."
    :code="code"
    :show-reset="false"
  >
    <Popover>
      <Button label="Abrir popover" />
      <template #content><p>Contenido contextual.</p></template>
    </Popover>
  </ComponentExample>
</template>
