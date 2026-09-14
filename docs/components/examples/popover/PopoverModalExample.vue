<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Popover } from '@/components/ui/Popover'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialModal = false
const modal = ref(initialModal)
const open = ref(true)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
import { Popover } from '@nono-cn/nono-ui/components/ui/Popover'

const modal = ref(${modal.value})
${scriptEnd}

<template>
  <div class="grid justify-items-center gap-3">
    <Popover v-model:open="open" :modal="modal">
      <Button variant="outline">Abrir popover</Button>

      <template #content>
        <div class="grid gap-1.5">
          <p class="text-sm font-medium">{{ modal ? 'Modo modal' : 'Modo no modal' }}</p>
          <p class="text-sm text-muted-foreground">Pulsa Escape o haz clic fuera para cerrarlo.</p>
        </div>
      </template>
    </Popover>
  </div>
</template>`,
)

function reset() {
  modal.value = initialModal
  open.value = true
}
</script>

<template>
  <ComponentExample
    title="Modal"
    description="Compara el comportamiento modal y no modal del contenido abierto."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="flex items-center gap-2 text-xs font-medium" for="popover-modal">
        <input id="popover-modal" v-model="modal" type="checkbox" />
        modal
      </label>
    </template>
    <div class="grid justify-items-center gap-3">
      <Popover v-model:open="open" :modal="modal">
        <Button variant="outline">Abrir popover</Button>

        <template #content>
          <div class="grid gap-1.5">
            <p class="text-sm font-medium">{{ modal ? 'Modo modal' : 'Modo no modal' }}</p>
            <p class="text-sm text-muted-foreground">
              Pulsa Escape o haz clic fuera para cerrarlo.
            </p>
          </div>
        </template>
      </Popover>
    </div>
  </ComponentExample>
</template>
