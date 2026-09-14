<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '@/components/ui/Accordion'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialValue = ['account']
const value = ref<string[]>([...initialValue])
const items = [
  { value: 'account', label: 'Cuenta', description: 'Gestiona tu información personal.' },
  { value: 'notifications', label: 'Notificaciones', description: 'Configura tus avisos.' },
  { value: 'security', label: 'Seguridad', description: 'Revisa las opciones de acceso.' },
]

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '@nono-cn/nono-ui/components/ui/Accordion'

const value = ref<string[]>(['account'])
const items = ${JSON.stringify(items, null, 2)}
${scriptEnd}

<template>
  <Accordion v-model:value="value" type="multiple" collapsible :items="items" />
</template>`

function reset() {
  value.value = [...initialValue]
}
</script>

<template>
  <ComponentExample
    title="Multiple"
    description="Permite varias secciones abiertas y controla el valor con v-model:value."
    :code="code"
    @reset="reset"
  >
    <div class="grid w-full max-w-md gap-2">
      <p class="text-xs text-muted-foreground">Abiertas: {{ value.join(', ') || 'ninguna' }}</p>
      <Accordion v-model:value="value" type="multiple" collapsible :items="items" />
    </div>
  </ComponentExample>
</template>
