<script setup lang="ts">
import { Accordion } from '@/components/ui/Accordion'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  {
    value: 'profile',
    label: 'Perfil',
    description: 'Información visible en tu perfil.',
    slot: 'profile',
  },
  {
    value: 'billing',
    label: 'Facturación',
    description: 'Métodos de pago y facturas.',
    slot: 'billing',
  },
  { value: 'security', label: 'Seguridad', description: 'Opciones de acceso y protección.' },
]

const code = `<script setup lang="ts">
import { Accordion } from '@nono-cn/nono-ui/components/ui/Accordion'

const items = ${JSON.stringify(items, null, 2)}
${scriptEnd}

<template>
  <Accordion :items="items">
    <template #label="{ item, open }">
      {{ item.label }} <span class="text-xs text-muted-foreground">({{ open ? 'abierto' : 'cerrado' }})</span>
    </template>
    <template #leading-profile><span aria-hidden="true">👤</span></template>
    <template #content="{ item }">
      <strong>{{ item.description }}</strong>
    </template>
    <template #content-billing>
      <div class="rounded-md bg-muted p-3 text-sm">Consulta aquí tus facturas y métodos de pago.</div>
    </template>
  </Accordion>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Personaliza el label y el contenido usando el contexto del elemento."
    :code="code"
    :show-reset="false"
  >
    <Accordion :items="items" class="w-full max-w-md">
      <template #label="{ item, open }">
        {{ item.label }}
        <span class="text-xs text-muted-foreground">({{ open ? 'abierto' : 'cerrado' }})</span>
      </template>
      <template #leading-profile><span aria-hidden="true">👤</span></template>
      <template #content="{ item }"
        ><strong>{{ item.description }}</strong></template
      >
      <template #content-billing>
        <div class="rounded-md bg-muted p-3 text-sm">
          Consulta aquí tus facturas y métodos de pago.
        </div>
      </template>
    </Accordion>
  </ComponentExample>
</template>
