<script setup lang="ts">
import { Label } from '@/components/ui/Label'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const code = `<script setup lang="ts">
import { Label } from '@nono-cn/nono-ui/components/ui/Label'
${scriptEnd}

<template>
  <Label for="email">Correo electrónico</Label>
</template>`
</script>
<template>
  <ComponentExample
    title="Uso básico"
    description="Una etiqueta sencilla."
    :code="code"
    :show-reset="false"
    ><Label for="email">Correo electrónico</Label></ComponentExample
  >
</template>
