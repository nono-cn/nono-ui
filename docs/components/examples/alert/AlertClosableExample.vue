<script setup lang="ts">
import { computed, ref } from 'vue'
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialClosable = true
const closable = ref(initialClosable)
const visible = ref(true)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '@nono-cn/nono-ui/components/ui/Alert'

const closable = ref(${closable.value})
const visible = ref(true)
${scriptEnd}

<template>
  <Alert
    v-if="visible"
    label="Sesión activa"
    description="Puedes cerrar este mensaje cuando ya no lo necesites."
    :closable="closable"
    @close="visible = false"
  />
  <button v-else type="button" @click="visible = true">Mostrar alerta</button>
</template>`,
)

function reset() {
  closable.value = initialClosable
  visible.value = true
}
</script>

<template>
  <ComponentExample
    title="Closable"
    description="Activa el botón de cierre y escucha close para actualizar el estado de tu vista."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="inline-flex items-center gap-2 text-xs font-medium" for="alert-closable">
        <input id="alert-closable" v-model="closable" type="checkbox" />
        closable
      </label>
    </template>
    <div class="grid w-full gap-3">
      <Alert
        v-if="visible"
        label="Sesión activa"
        description="Puedes cerrar este mensaje cuando ya no lo necesites."
        :closable="closable"
        @close="visible = false"
      />
      <button
        v-else
        type="button"
        class="w-fit rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent"
        @click="visible = true"
      >
        Mostrar alerta
      </button>
    </div>
  </ComponentExample>
</template>
