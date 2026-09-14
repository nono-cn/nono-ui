<script setup lang="ts">
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const ui = {
  trigger: () => ({ class: 'rounded-full' }),
  overlay: () => ({ class: 'bg-slate-950/70' }),
  content: () => ({ class: 'border-primary/50' }),
  header: () => ({ class: 'text-left' }),
  label: () => ({ class: 'text-primary' }),
  description: () => ({ class: 'text-current/70' }),
  body: () => ({ class: 'rounded-md bg-muted/40 p-3' }),
  footer: () => ({ class: 'border-t pt-4' }),
}

const code = `<script setup lang="ts">
import { AlertDialog } from '@nono-cn/nono-ui/components/ui/AlertDialog'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'

const ui = {
  trigger: () => ({ class: 'rounded-full' }),
  overlay: () => ({ class: 'bg-slate-950/70' }),
  content: () => ({ class: 'border-primary/50' }),
  header: () => ({ class: 'text-left' }),
  label: () => ({ class: 'text-primary' }),
  description: () => ({ class: 'text-current/70' }),
  body: () => ({ class: 'rounded-md bg-muted/40 p-3' }),
  footer: () => ({ class: 'border-t pt-4' }),
}
${scriptEnd}

<template>
  <AlertDialog
    label="Personalizado"
    description="Cada resolver recibe atributos y clases adicionales para una parte interna."
    :ui="ui"
  >
    <Button>Mostrar diálogo</Button>
    <template #content>
      <p class="text-sm">La composición conserva la semántica de AlertDialog.</p>
    </template>
  </AlertDialog>
</template>`
</script>

<template>
  <ComponentExample
    title="UI"
    description="Personaliza los atributos y clases de trigger, overlay, content, header, label, description, body y footer."
    :code="code"
    :show-reset="false"
  >
    <AlertDialog
      label="Personalizado"
      description="Cada resolver recibe atributos y clases adicionales para una parte interna."
      :ui="ui"
    >
      <Button>Mostrar diálogo</Button>
      <template #content>
        <p class="text-sm">La composición conserva la semántica de AlertDialog.</p>
      </template>
    </AlertDialog>
  </ComponentExample>
</template>
