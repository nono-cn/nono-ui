<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
import { ButtonGroup } from '@nono-cn/nono-ui/components/ui/ButtonGroup'
<\/script>

<template>
  <ButtonGroup aria-label="Acciones del documento">
    <Button label="Anterior" variant="outline" />
    <Button label="Guardar" />
    <Button label="Siguiente" variant="outline" />
  </ButtonGroup>
</template>`
</script>

<template>
  <ComponentExample
    title="Grupo básico"
    description="Agrupa acciones relacionadas."
    :code="code"
    :show-reset="false"
  >
    <ButtonGroup aria-label="Acciones del documento">
      <Button label="Anterior" variant="outline" />
      <Button label="Guardar" />
      <Button label="Siguiente" variant="outline" />
    </ButtonGroup>
  </ComponentExample>
</template>
