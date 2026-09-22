<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button label="Guardando" loading />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Loading"
    description="Muestra el estado de carga y comunica que la acción está temporalmente ocupada."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Button label="Guardando" loading />
    </div>
  </ComponentExample>
</template>
