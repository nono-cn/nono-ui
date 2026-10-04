<script setup lang="ts">
import { computed, ref } from 'vue'
import { LinearChart } from '@/components/ui/LinearChart'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const data = [
  { day: 1, value: 12 },
  { day: 2, value: 18 },
  { day: 3, value: null },
  { day: 4, value: 24 },
  { day: 5, value: 20 },
]
const interpolateMissingData = ref(false)
const fallback = ref('none')
const fallbackValue = computed(() =>
  fallback.value === 'none' ? undefined : Number(fallback.value),
)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { LinearChart } from '__DOCS_PACKAGE__/components/ui/LinearChart'

const data = [
  { day: 1, value: 12 },
  { day: 2, value: 18 },
  { day: 3, value: null },
  { day: 4, value: 24 },
  { day: 5, value: 20 },
]
const interpolateMissingData = ref(${interpolateMissingData.value})
const fallbackValue = ${fallbackValue.value === undefined ? 'undefined' : fallbackValue.value}
${scriptEnd}

<template>
  <LinearChart
    :data="data"
    :x="(point) => point.day"
    :y="(point) => point.value"
    :interpolate-missing-data="interpolateMissingData"
    :fallback-value="fallbackValue"
    aria-label="Daily values with a missing value on day 3"
  />
</template>`,
)

function reset() {
  interpolateMissingData.value = false
  fallback.value = 'none'
}
</script>

<template>
  <ComponentExample
    title="Missing data"
    description="Choose whether to connect points across a null value or substitute a numeric fallback."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap items-end gap-4">
        <ExampleCheckboxControl v-model="interpolateMissingData" label="Interpolate missing data" />
        <ExampleSelectControl
          v-model="fallback"
          label="Fallback value"
          :options="['none', '0', '10']"
        />
      </div>
    </template>
    <LinearChart
      :data="data"
      :x="(point) => point.day"
      :y="(point) => point.value"
      :interpolate-missing-data="interpolateMissingData"
      :fallback-value="fallbackValue"
      aria-label="Daily values with a missing value on day 3"
    />
  </ComponentExample>
</template>
