<script setup lang="ts">
import { computed, ref } from 'vue'
import { AspectRatio } from '@/components/ui/AspectRatio'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialRatio = 16 / 9
const ratio = ref(initialRatio)
const ratios = [
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: '21:9', value: 21 / 9 },
] as const

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { AspectRatio } from '@nono-cn/nono-ui/components/ui/AspectRatio'

const ratio = ref(${ratio.value})
${scriptEnd}

<template>
  <AspectRatio
    :ratio="ratio"
    class="w-full max-w-xl overflow-hidden rounded-xl border bg-muted"
  >
    <div class="grid h-full w-full place-items-center bg-gradient-to-br from-primary/20 to-primary/5">
      <p class="font-semibold">Ratio: {{ ratio }}</p>
    </div>
  </AspectRatio>
</template>`,
)

function reset() {
  ratio.value = initialRatio
}
</script>

<template>
  <ComponentExample
    title="Ratio"
    description="Selecciona una proporción y observa cómo cambia la altura del contenido."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="aspect-ratio-value">
        ratio
        <select
          id="aspect-ratio-value"
          v-model="ratio"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="item in ratios" :key="item.label" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </label>
    </template>
    <AspectRatio :ratio="ratio" class="w-full max-w-xl overflow-hidden rounded-xl border bg-muted">
      <div
        class="grid h-full w-full place-items-center bg-gradient-to-br from-primary/20 to-primary/5"
      >
        <p class="font-semibold">Ratio: {{ ratio }}</p>
      </div>
    </AspectRatio>
  </ComponentExample>
</template>
