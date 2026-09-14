<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialColor = '#2563eb'
const color = ref(initialColor)

const code = computed(
  () => `<script setup lang="ts">
import { Icon } from '@nono-cn/nono-ui/components/ui/Icon'

const color = '${color.value}'
${scriptEnd}

<template>
  <Icon name="info" :color="color" />
</template>`,
)

function reset() {
  color.value = initialColor
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Escribe cualquier valor CSS válido, como un color hexadecimal o currentColor."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="icon-color">
        color
        <input
          id="icon-color"
          v-model="color"
          type="text"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          placeholder="currentColor"
        />
      </label>
    </template>
    <Icon name="info" :color="color" />
  </ComponentExample>
</template>
