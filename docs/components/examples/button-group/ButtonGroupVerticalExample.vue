<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { ButtonGroup } from '__DOCS_PACKAGE__/components/ui/ButtonGroup'
<\/script>

<template>
  <ButtonGroup orientation="vertical" aria-label="Acciones rápidas">
    <Button label="Editar" />
    <Button label="Duplicar" variant="outline" />
    <Button label="Eliminar" variant="outline" severity="error" />
  </ButtonGroup>
</template>`
</script>

<template>
  <ComponentExample
    title="Orientación vertical"
    description="Apila las acciones relacionadas."
    :code="code"
    :show-reset="false"
  >
    <ButtonGroup orientation="vertical" aria-label="Acciones rápidas">
      <Button label="Editar" />
      <Button label="Duplicar" variant="outline" />
      <Button label="Eliminar" variant="outline" severity="error" />
    </ButtonGroup>
  </ComponentExample>
</template>
