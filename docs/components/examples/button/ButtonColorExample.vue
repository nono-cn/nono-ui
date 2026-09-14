<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialColor = '#2563eb'
const color = ref(initialColor)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'

const color = ref(${JSON.stringify(color.value)})
${scriptEnd}

<template>
  <Button label="Guardar" :color="color" />
</template>`,
)

function reset() {
  color.value = initialColor
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Aplica un valor CSS personalizado y calcula automáticamente el contraste."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="button-color">
        color
        <input
          id="button-color"
          v-model="color"
          type="text"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          placeholder="#2563eb"
        />
      </label>
    </template>
    <Button label="Guardar" :color="color" />
  </ComponentExample>
</template>
