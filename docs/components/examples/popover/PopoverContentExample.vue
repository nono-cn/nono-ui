<script setup lang="ts">
import { Popover } from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Popover } from '@nono-cn/nono-ui/components/ui/Popover'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
<\/script>

<template>
  <Popover :content="{ side: 'right', align: 'start', sideOffset: 12, alignOffset: 4, avoidCollisions: true }">
    <Button label="Abrir contenido" variant="outline" />
    <template #content><p>Contenido colocado a la derecha.</p></template>
  </Popover>
</template>`
</script>

<template>
  <ComponentExample
    title="Content"
    description="Configura side, align y offsets del contenido."
    :code="code"
    :show-reset="false"
  >
    <Popover
      :content="{
        side: 'right',
        align: 'start',
        sideOffset: 12,
        alignOffset: 4,
        avoidCollisions: true,
      }"
    >
      <Button label="Abrir contenido" variant="outline" />
      <template #content><p>Contenido colocado a la derecha.</p></template>
    </Popover>
  </ComponentExample>
</template>
