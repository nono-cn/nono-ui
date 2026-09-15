<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialMax = 100
const value = 50
const max = ref(initialMax)
const maxOptions = [50, 100, 200] as const

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '@nono-cn/nono-ui/components/ui/Progress'

const value = 50
const max = ref(${max.value})
${scriptEnd}

<template>
  <Progress :value="value" :max="max" />
</template>`,
)

function reset() {
  max.value = initialMax
}
</script>

<template>
  <ComponentExample
    title="Max"
    description="Ajusta el valor máximo para calcular el porcentaje sobre una escala personalizada."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="progress-max">
        max
        <select
          id="progress-max"
          v-model.number="max"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="maxOption in maxOptions" :key="maxOption" :value="maxOption">
            {{ maxOption }}
          </option>
        </select>
      </label>
    </template>
    <div class="grid w-full max-w-md gap-2">
      <div class="flex items-center justify-between text-xs text-muted-foreground">
        <span>Escala personalizada</span>
        <code class="rounded bg-muted px-1.5 py-0.5">{{ value }} / {{ max }}</code>
      </div>
      <Progress :value="value" :max="max" />
    </div>
  </ComponentExample>
</template>
