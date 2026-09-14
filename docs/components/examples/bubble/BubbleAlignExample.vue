<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bubble } from '@/components/ui/Bubble'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const initialAlign = 'start'
const align = ref<'start' | 'end'>(initialAlign)
const code = computed(
  () => `<script setup lang="ts">
import { Bubble } from '@nono-cn/nono-ui/components/ui/Bubble'
import { ref } from 'vue'

const align = ref<'start' | 'end'>('${align.value}')
${scriptEnd}
<template>
  <div class="flex w-full flex-col gap-3">
    <Bubble :align="align">${align.value === 'start' ? 'Recibido' : 'Enviado'}</Bubble>
  </div>
</template>`,
)
function reset() {
  align.value = initialAlign
}
</script>
<template>
  <ComponentExample
    title="Align"
    description="Alinea mensajes recibidos y enviados."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="bubble-align"
        >align<select
          id="bubble-align"
          v-model="align"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option value="start">start</option>
          <option value="end">end</option>
        </select></label
      >
    </template>
    <div class="flex w-full flex-col gap-3">
      <Bubble :align="align">{{ align === 'start' ? 'Recibido' : 'Enviado' }}</Bubble>
    </div>
  </ComponentExample>
</template>
