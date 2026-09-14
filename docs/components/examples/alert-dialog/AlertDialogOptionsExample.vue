<script setup lang="ts">
import { computed, ref } from 'vue'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialForceMount = false
const initialDisableOutsidePointerEvents = true
const forceMount = ref(initialForceMount)
const disableOutsidePointerEvents = ref(initialDisableOutsidePointerEvents)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { AlertDialog } from '@nono-cn/nono-ui/components/ui/AlertDialog'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'

const forceMount = ref(${forceMount.value})
const disableOutsidePointerEvents = ref(${disableOutsidePointerEvents.value})
${scriptEnd}

<template>
  <AlertDialog
    label="Opciones del diálogo"
    description="Estas props controlan el montaje y la interacción exterior."
    :force-mount="forceMount"
    :disable-outside-pointer-events="disableOutsidePointerEvents"
  >
    <Button variant="outline">Abrir diálogo</Button>
  </AlertDialog>
</template>`,
)

function reset() {
  forceMount.value = initialForceMount
  disableOutsidePointerEvents.value = initialDisableOutsidePointerEvents
}
</script>

<template>
  <ComponentExample
    title="Mount y pointer events"
    description="Ajusta el montaje del contenido y si se bloquean los eventos de puntero fuera del diálogo."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="grid gap-3 sm:grid-cols-2">
        <label class="flex items-center gap-2 text-xs font-medium" for="alert-dialog-force-mount">
          <input id="alert-dialog-force-mount" v-model="forceMount" type="checkbox" />
          forceMount
        </label>
        <label
          class="flex items-center gap-2 text-xs font-medium"
          for="alert-dialog-disable-outside-pointer-events"
        >
          <input
            id="alert-dialog-disable-outside-pointer-events"
            v-model="disableOutsidePointerEvents"
            type="checkbox"
          />
          disableOutsidePointerEvents
        </label>
      </div>
    </template>
    <AlertDialog
      label="Opciones del diálogo"
      description="Estas props controlan el montaje y la interacción exterior."
      :force-mount="forceMount"
      :disable-outside-pointer-events="disableOutsidePointerEvents"
    >
      <Button variant="outline">Abrir diálogo</Button>
    </AlertDialog>
  </ComponentExample>
</template>
