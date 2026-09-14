<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bubble } from '@/components/ui/Bubble'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const initialVariant = 'solid'
const variant = ref<'solid' | 'outline' | 'plain' | 'subtle' | 'soft' | 'muted'>(initialVariant)
const code = computed(
  () => `<script setup lang="ts">
import { Bubble } from '@nono-cn/nono-ui/components/ui/Bubble'
import { ref } from 'vue'

const variant = ref('${variant.value}')
${scriptEnd}
<template>
    <div class="flex w-full flex-col gap-3">
      <Bubble :variant="variant">${variant.value}</Bubble>
    </div>
</template>`,
)
function reset() {
  variant.value = initialVariant
}
</script>
<template>
  <ComponentExample
    title="Variant"
    description="Compara tratamientos visuales."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><label class="grid max-w-xs gap-1.5 text-xs font-medium" for="bubble-variant"
        >variant<select
          id="bubble-variant"
          v-model="variant"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option
            v-for="value in ['solid', 'outline', 'plain', 'subtle', 'soft', 'muted']"
            :key="value"
            :value="value"
          >
            {{ value }}
          </option>
        </select></label
      ></template
    >
    <div class="flex w-full flex-col gap-3">
      <Bubble :variant="variant">{{ variant }}</Bubble>
    </div>
  </ComponentExample>
</template>
