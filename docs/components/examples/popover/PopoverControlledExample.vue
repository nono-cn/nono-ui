<script setup lang="ts">
import { ref } from 'vue'
import { Popover } from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'

const open = ref(false)
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Popover } from '__DOCS_PACKAGE__/components/ui/Popover'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const open = ref(false)
<\/script>

<template>
  <Popover v-model:open="open">
    <Button :label="open ? 'Cerrar' : 'Abrir'" />
    <template #content><p>Estado: {{ open ? 'abierto' : 'cerrado' }}</p></template>
  </Popover>
</template>`
</script>

<template>
  <ComponentExample
    title="Estado controlado"
    description="Sincroniza el estado con v-model:open."
    :code="code"
    :show-reset="false"
  >
    <Popover v-model:open="open">
      <Button :label="open ? 'Cerrar' : 'Abrir'" />
      <template #content
        ><p>Estado: {{ open ? 'abierto' : 'cerrado' }}</p></template
      >
    </Popover>
  </ComponentExample>
</template>
