<script setup lang="ts">
import { computed, ref } from 'vue'
import { Message, type MessageAlign } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialAlign: MessageAlign = 'start'
const align = ref<MessageAlign>(initialAlign)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Message, type MessageAlign } from '@nono-cn/nono-ui/components/ui/Message'

const align = ref<MessageAlign>('${align.value}')
${scriptEnd}

<template>
  <Message
    message="Nos vemos a las 18:00."
    :align="align"
    :avatar="{ label: 'CN' }"
    class="w-full max-w-md"
  />
</template>`,
)

function reset() {
  align.value = initialAlign
}
</script>

<template>
  <ComponentExample
    title="Align"
    description="Alinea el mensaje y su burbuja al inicio o al final."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="message-align">
        align
        <select
          id="message-align"
          v-model="align"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option value="start">start</option>
          <option value="end">end</option>
        </select>
      </label>
    </template>
    <Message
      message="Nos vemos a las 18:00."
      :align="align"
      :avatar="{ label: 'CN' }"
      class="w-full max-w-md"
    />
  </ComponentExample>
</template>
