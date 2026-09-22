<script setup lang="ts">
import { Popover } from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Popover } from '@nono-cn/nono-ui/components/ui/Popover'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
<\/script>

<template>
  <Popover :show-arrow="true" :arrow="{ width: 16, height: 8, rounded: true }">
    <Button label="Mostrar flecha" />
    <template #content><p>Flecha redondeada y personalizada.</p></template>
  </Popover>
</template>`
</script>

<template>
  <ComponentExample
    title="Arrow"
    description="Personaliza width, height y rounded."
    :code="code"
    :show-reset="false"
  >
    <Popover :show-arrow="true" :arrow="{ width: 16, height: 8, rounded: true }">
      <Button label="Mostrar flecha" />
      <template #content><p>Flecha redondeada y personalizada.</p></template>
    </Popover>
  </ComponentExample>
</template>
