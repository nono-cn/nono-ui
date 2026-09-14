<script setup lang="ts">
import { computed, ref } from 'vue'
import { Announcer } from '@/components/ui/Announcer'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialMessage = 'Los cambios se han guardado correctamente.'
const message = ref(initialMessage)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Announcer } from '@nono-cn/nono-ui/components/ui/Announcer'

const message = ref(${JSON.stringify(message.value)})
${scriptEnd}

<template>
  <div class="grid gap-2">
    <span class="text-sm font-medium">Estado actualizado</span>
    <Announcer :message="message" />
  </div>
</template>`,
)

function reset() {
  message.value = initialMessage
}
</script>

<template>
  <ComponentExample
    title="Message"
    description="Actualiza message cuando cambia el estado de una operación."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid w-full max-w-lg gap-1.5 text-xs font-medium" for="announcer-message">
        message
        <input
          id="announcer-message"
          v-model="message"
          type="text"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        />
      </label>
    </template>
    <div class="grid gap-2 text-center">
      <span class="text-sm font-medium">Estado actualizado</span>
      <Announcer :message="message" />
      <span class="text-xs text-muted-foreground">Mensaje actual: {{ message }}</span>
    </div>
  </ComponentExample>
</template>
