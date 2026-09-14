<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
import { ButtonGroup } from '@nono-cn/nono-ui/components/ui/ButtonGroup'
${scriptEnd}

<template>
  <ButtonGroup>
    <Button label="Anterior" />
    <Button label="Guardar" variant="outline" />
    <Button label="Siguiente" severity="secondary" />
  </ButtonGroup>
</template>`
</script>
<template>
  <ComponentExample
    title="Uso básico"
    description="Agrupa tres acciones relacionadas."
    :code="code"
    :show-reset="false"
  >
    <ButtonGroup>
      <Button label="Anterior" />
      <Button label="Guardar" variant="outline" />
      <Button label="Siguiente" severity="secondary" />
    </ButtonGroup>
  </ComponentExample>
</template>
