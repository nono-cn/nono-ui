<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialColor = '#2563eb'
const color = ref(initialColor)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Badge } from '@nono-cn/nono-ui/components/ui/Badge'

const color = ref(${JSON.stringify(color.value)})
${scriptEnd}

<template>
  <Badge label="Custom" :color="color" />
</template>`,
)

function reset() {
  color.value = initialColor
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Aplica un valor CSS personalizado y calcula automáticamente el color de contraste."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="badge-color">
        color
        <input
          id="badge-color"
          v-model="color"
          type="text"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          placeholder="#2563eb"
        />
      </label>
    </template>
    <Badge label="Custom" :color="color" />
  </ComponentExample>
</template>
