<script setup lang="ts">
import { Label } from '@/components/ui/Label'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Label } from '@nono-cn/nono-ui/components/ui/Label'
${scriptEnd}

<template>
  <div class="grid w-full max-w-sm gap-2">
    <Label for="name">Nombre</Label>
    <input
      id="name"
      type="text"
      placeholder="Escribe tu nombre"
      class="h-9 rounded-md border bg-background px-3 text-sm outline-none"
    />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Asocia una etiqueta visible con un control de formulario."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-sm gap-2">
      <Label for="name">Nombre</Label>
      <input
        id="name"
        type="text"
        placeholder="Escribe tu nombre"
        class="h-9 rounded-md border bg-background px-3 text-sm outline-none"
      />
    </div>
  </ComponentExample>
</template>
