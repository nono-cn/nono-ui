<script setup lang="ts">
import { computed, ref } from 'vue'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialOpen = false
const open = ref(initialOpen)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { AlertDialog } from '@nono-cn/nono-ui/components/ui/AlertDialog'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'

const open = ref(${open.value})
${scriptEnd}

<template>
  <AlertDialog
    v-model:open="open"
    label="Cambiar configuración"
    description="Confirma la configuración antes de continuar."
  >
    <Button variant="outline">{{ open ? 'Cerrar confirmación' : 'Abrir confirmación' }}</Button>
    <template #content>
      <p class="text-sm">El estado del diálogo se controla desde el componente padre.</p>
    </template>
  </AlertDialog>
  <span class="text-xs text-muted-foreground" aria-live="polite">
    Estado: {{ open ? 'abierto' : 'cerrado' }}
  </span>
</template>`,
)

function reset() {
  open.value = initialOpen
}
</script>

<template>
  <ComponentExample
    title="Open"
    description="Controla la visibilidad desde el componente padre con v-model:open."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="flex items-center gap-2 text-xs font-medium" for="alert-dialog-open">
        <input id="alert-dialog-open" v-model="open" type="checkbox" />
        open
      </label>
    </template>
    <div class="grid justify-items-center gap-3">
      <AlertDialog
        v-model:open="open"
        label="Cambiar configuración"
        description="Confirma la configuración antes de continuar."
      >
        <Button variant="outline">
          {{ open ? 'Cerrar confirmación' : 'Abrir confirmación' }}
        </Button>
        <template #content>
          <p class="text-sm">El estado del diálogo se controla desde el componente padre.</p>
        </template>
      </AlertDialog>
      <span class="text-xs text-muted-foreground" aria-live="polite">
        Estado: {{ open ? 'abierto' : 'cerrado' }}
      </span>
    </div>
  </ComponentExample>
</template>
