<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialValue = 40
const initialIndeterminate = false
const value = ref<number | null>(initialValue)
const indeterminate = ref(initialIndeterminate)

const currentValue = computed(() => (indeterminate.value ? null : value.value))

const code = computed(
  () => `<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress } from '@nono-cn/nono-ui/components/ui/Progress'

const value = ref<number | null>(${value.value})
const indeterminate = ref(${indeterminate.value})
const currentValue = computed(() => (indeterminate.value ? null : value.value))
${scriptEnd}

<template>
  <Progress :value="currentValue" />
</template>`,
)

function reset() {
  value.value = initialValue
  indeterminate.value = initialIndeterminate
}
</script>

<template>
  <ComponentExample
    title="Value"
    description="Controla el valor desde el estado del padre y usa null para representar un progreso indeterminado."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex w-full max-w-md flex-wrap items-center gap-4">
        <label class="grid min-w-48 flex-1 gap-1.5 text-xs font-medium" for="progress-value">
          value
          <input
            id="progress-value"
            v-model.number="value"
            type="range"
            min="0"
            max="100"
            :disabled="indeterminate"
          />
        </label>
        <output class="min-w-10 text-right font-mono text-xs" for="progress-value">
          {{ indeterminate ? '—' : `${value}%` }}
        </output>
        <label
          class="inline-flex items-center gap-2 text-xs font-medium"
          for="progress-indeterminate"
        >
          <input id="progress-indeterminate" v-model="indeterminate" type="checkbox" />
          indeterminate
        </label>
      </div>
    </template>
    <Progress class="w-full max-w-md" :value="currentValue" />
  </ComponentExample>
</template>
