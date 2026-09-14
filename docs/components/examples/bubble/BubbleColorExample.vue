<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bubble } from '@/components/ui/Bubble'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const initialColor = '#7c3aed'
const color = ref(initialColor)
const code = computed(
  () => `<script setup lang="ts">
import { Bubble } from '@nono-cn/nono-ui/components/ui/Bubble'
const color = '${color.value}'
${scriptEnd}
<template>
  <div class="flex w-full flex-col gap-3">
    <Bubble :color="color">Color personalizado</Bubble>
  </div>
</template>`,
)
function reset() {
  color.value = initialColor
}
</script>
<template>
  <ComponentExample
    title="Color"
    description="Personaliza el color de cada burbuja."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><label class="flex max-w-xs items-center gap-3 text-xs font-medium" for="bubble-color"
        >color<input
          id="bubble-color"
          v-model="color"
          type="color"
          class="size-9 rounded border bg-background p-1" /></label
    ></template>
    <div class="flex w-full flex-col gap-3">
      <Bubble :color="color">Color personalizado</Bubble>
    </div>
  </ComponentExample>
</template>
