<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Popover } from '@/components/ui/Popover'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialOpen = false
const open = ref(initialOpen)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
import { Popover } from '@nono-cn/nono-ui/components/ui/Popover'

const open = ref(${open.value})
${scriptEnd}

<template>
  <div class="grid justify-items-center gap-3">
    <Popover v-model:open="open">
      <Button variant="outline">{{ open ? 'Cerrar popover' : 'Abrir popover' }}</Button>

      <template #content>
        <p class="text-sm">El estado abierto está controlado desde el componente padre.</p>
      </template>
    </Popover>
    <span class="text-xs text-muted-foreground" aria-live="polite">
      Estado: {{ open ? 'abierto' : 'cerrado' }}
    </span>
  </div>
</template>`,
)

function reset() {
  open.value = initialOpen
}
</script>

<template>
  <ComponentExample
    title="Open"
    description="Controla el estado con v-model:open y sincronízalo con otros elementos de la interfaz."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="flex items-center gap-2 text-xs font-medium" for="popover-open">
        <input id="popover-open" v-model="open" type="checkbox" />
        open
      </label>
    </template>
    <div class="grid justify-items-center gap-3">
      <Popover v-model:open="open">
        <Button variant="outline">{{ open ? 'Cerrar popover' : 'Abrir popover' }}</Button>

        <template #content>
          <p class="text-sm">El estado abierto está controlado desde el componente padre.</p>
        </template>
      </Popover>
      <span class="text-xs text-muted-foreground" aria-live="polite">
        Estado: {{ open ? 'abierto' : 'cerrado' }}
      </span>
    </div>
  </ComponentExample>
</template>
