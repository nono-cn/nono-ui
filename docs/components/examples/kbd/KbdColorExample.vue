<script setup lang="ts">
import { computed, ref } from 'vue'
import { Kbd } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialColor = '#2563eb'
const color = ref(initialColor)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Kbd } from '@nono-cn/nono-ui/components/ui/Kbd'

const color = ref(${JSON.stringify(color.value)})
${scriptEnd}

<template>
  <Kbd label="Ctrl" :color="color" />
</template>`,
)

function reset() {
  color.value = initialColor
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Aplica cualquier valor CSS válido al color de la tecla."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="kbd-color">
        color
        <input
          id="kbd-color"
          v-model="color"
          type="text"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          placeholder="#2563eb"
        />
      </label>
    </template>
    <Kbd label="Ctrl" :color="color" />
  </ComponentExample>
</template>
