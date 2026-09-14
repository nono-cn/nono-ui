<script setup lang="ts">
import { computed, ref } from 'vue'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button, type ButtonSeverity } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSeverity: ButtonSeverity = 'error'
const actionSeverity = ref<ButtonSeverity>(initialSeverity)
const severities: ButtonSeverity[] = ['primary', 'secondary', 'warning', 'success', 'error']

const actionButton = computed(() => ({
  label: 'Confirmar acción',
  severity: actionSeverity.value,
}))

const code = computed(
  () => `<script setup lang="ts">
import { computed, ref } from 'vue'
import { AlertDialog } from '@nono-cn/nono-ui/components/ui/AlertDialog'
import type { ButtonSeverity } from '@nono-cn/nono-ui/components/ui/Button'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'

const actionSeverity = ref<ButtonSeverity>('${actionSeverity.value}')
const actionButton = computed(() => ({
  label: 'Confirmar acción',
  severity: actionSeverity.value,
}))
${scriptEnd}

<template>
  <AlertDialog
    label="Publicar cambios"
    description="Revisa la severidad y el texto de cada acción antes de confirmar."
    :action-button="actionButton"
    :cancel-button="{ label: 'Volver', severity: 'secondary' }"
  >
    <Button variant="outline">Publicar cambios</Button>
  </AlertDialog>
</template>`,
)

function reset() {
  actionSeverity.value = initialSeverity
}
</script>

<template>
  <ComponentExample
    title="Action y cancel"
    description="Pasa configuraciones de Button a actionButton y cancelButton para personalizar las acciones."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="alert-dialog-action-severity">
        actionButton.severity
        <select
          id="alert-dialog-action-severity"
          v-model="actionSeverity"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="severity in severities" :key="severity" :value="severity">
            {{ severity }}
          </option>
        </select>
      </label>
    </template>
    <AlertDialog
      label="Publicar cambios"
      description="Revisa la severidad y el texto de cada acción antes de confirmar."
      :action-button="actionButton"
      :cancel-button="{ label: 'Volver', severity: 'secondary' }"
    >
      <Button variant="outline">Publicar cambios</Button>
    </AlertDialog>
  </ComponentExample>
</template>
