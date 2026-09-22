<script setup lang="ts">
import { Checkbox } from '@/components/ui/Checkbox'
import { FieldSet } from '@/components/ui/FieldSet'
import { Label } from '@/components/ui/Label'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Checkbox } from '@nono-cn/nono-ui/components/ui/Checkbox'
import { FieldSet } from '@nono-cn/nono-ui/components/ui/FieldSet'
import { Label } from '@nono-cn/nono-ui/components/ui/Label'
${scriptEnd}

<template>
  <div class="w-full max-w-none rounded-lg border border-border p-6">
    <FieldSet
      class="w-full"
      legend="Notificaciones"
      description="Elige qué avisos quieres recibir."
    >
      <div class="flex items-center gap-2">
        <Checkbox id="updates" />
        <Label for="updates">Actualizaciones del producto</Label>
      </div>
    </FieldSet>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Description"
    description="Añade contexto adicional debajo de la leyenda."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-none rounded-lg border border-border p-6">
      <FieldSet
        class="w-full"
        legend="Notificaciones"
        description="Elige qué avisos quieres recibir."
      >
        <div class="flex items-center gap-2">
          <Checkbox id="updates" />
          <Label for="updates">Actualizaciones del producto</Label>
        </div>
      </FieldSet>
    </div>
  </ComponentExample>
</template>
