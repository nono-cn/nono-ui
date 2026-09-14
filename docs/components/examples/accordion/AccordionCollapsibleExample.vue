<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '@/components/ui/Accordion'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialValue = 'profile'
const value = ref<string | undefined>(initialValue)
const items = [
  { value: 'profile', label: 'Perfil', description: 'Información visible en tu perfil.' },
  { value: 'preferences', label: 'Preferencias', description: 'Opciones de idioma y apariencia.' },
  { value: 'privacy', label: 'Privacidad', description: 'Controles sobre tus datos y actividad.' },
]

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '@nono-cn/nono-ui/components/ui/Accordion'

const value = ref<string | undefined>('profile')
const items = ${JSON.stringify(items, null, 2)}
${scriptEnd}

<template>
  <Accordion v-model:value="value" collapsible :items="items" />
</template>`

function reset() {
  value.value = initialValue
}
</script>

<template>
  <ComponentExample
    title="Collapsible"
    description="Con collapsible puedes cerrar la sección abierta haciendo clic de nuevo en su activador."
    :code="code"
    @reset="reset"
  >
    <div class="grid w-full max-w-md gap-2">
      <p class="text-xs text-muted-foreground">Abierta: {{ value || 'ninguna' }}</p>
      <Accordion v-model:value="value" collapsible :items="items" />
    </div>
  </ComponentExample>
</template>
