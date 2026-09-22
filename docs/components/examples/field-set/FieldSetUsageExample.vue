<script setup lang="ts">
import { FieldSet } from '@/components/ui/FieldSet'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { FieldSet } from '__DOCS_PACKAGE__/components/ui/FieldSet'
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
${scriptEnd}

<template>
  <div class="w-full max-w-none rounded-lg border border-border p-6">
    <FieldSet
      class="w-full"
      legend="Datos de contacto"
      description="Usaremos estos datos para comunicarnos contigo."
    >
      <div class="grid gap-2">
        <Label for="name">Nombre</Label>
        <Input id="name" placeholder="Tu nombre" />
      </div>
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="tu@email.com" />
      </div>
    </FieldSet>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Agrupa controles relacionados con una leyenda y una descripción."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-none rounded-lg border border-border p-6">
      <FieldSet
        class="w-full"
        legend="Datos de contacto"
        description="Usaremos estos datos para comunicarnos contigo."
      >
        <div class="grid gap-2">
          <Label for="name">Nombre</Label>
          <Input id="name" placeholder="Tu nombre" />
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="tu@email.com" />
        </div>
      </FieldSet>
    </div>
  </ComponentExample>
</template>
