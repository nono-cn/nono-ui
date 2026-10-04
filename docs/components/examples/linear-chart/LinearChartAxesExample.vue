<script setup lang="ts">
import { computed, ref } from 'vue'
import { LinearChart } from '@/components/ui/LinearChart'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const data = [
  { quarter: 1, revenue: 1200 },
  { quarter: 2, revenue: 2400 },
  { quarter: 3, revenue: 2100 },
  { quarter: 4, revenue: 3900 },
]
const gridLine = ref(true)
const compactTicks = ref(false)
const formattedX = ref(false)
const yNumTicks = ref('5')
const xTickFormat = (value: number | Date) =>
  formattedX.value ? `Q${Number(value)}` : String(value)
const yTickFormat = (value: number | Date) =>
  compactTicks.value ? String(Math.round(Number(value) / 1000)) + 'k' : String(value)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { LinearChart } from '__DOCS_PACKAGE__/components/ui/LinearChart'

const data = [
  { quarter: 1, revenue: 1200 },
  { quarter: 2, revenue: 2400 },
  { quarter: 3, revenue: 2100 },
  { quarter: 4, revenue: 3900 },
]
const gridLine = ref(${gridLine.value})
const compactTicks = ref(${compactTicks.value})
const formattedX = ref(${formattedX.value})
const yNumTicks = ref('${yNumTicks.value}')
const xTickFormat = (value: number | Date) =>
  formattedX.value ? 'Q' + Number(value) : String(value)
const yTickFormat = (value: number | Date) =>
  compactTicks.value ? String(Math.round(Number(value) / 1000)) + 'k' : String(value)
${scriptEnd}

<template>
  <LinearChart
    :data="data"
    :x="(point) => point.quarter"
    :y="(point) => point.revenue"
    :y-domain="[0, 5000]"
    :x-num-ticks="4"
    :y-num-ticks="Number(yNumTicks)"
    :x-tick-format="xTickFormat"
    :grid-line="gridLine"
    :y-tick-format="yTickFormat"
    x-label="Quarter"
    y-label="Revenue"
    aria-label="Quarterly revenue"
  />
</template>`,
)

function reset() {
  gridLine.value = true
  compactTicks.value = false
  formattedX.value = false
  yNumTicks.value = '5'
}
</script>

<template>
  <ComponentExample
    title="Axes and grid"
    description="Set labels, tick formatting and counts, the Y domain, and grid lines."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleCheckboxControl v-model="gridLine" label="Grid lines" />
        <ExampleCheckboxControl v-model="compactTicks" label="Compact Y ticks" />
        <ExampleCheckboxControl v-model="formattedX" label="Quarter X ticks" />
        <ExampleSelectControl v-model="yNumTicks" label="Y ticks" :options="['3', '5', '7']" />
      </div>
    </template>
    <LinearChart
      :data="data"
      :x="(point) => point.quarter"
      :y="(point) => point.revenue"
      :y-domain="[0, 5000]"
      :x-num-ticks="4"
      :y-num-ticks="Number(yNumTicks)"
      :x-tick-format="xTickFormat"
      :grid-line="gridLine"
      :y-tick-format="yTickFormat"
      x-label="Quarter"
      y-label="Revenue"
      aria-label="Quarterly revenue"
    />
  </ComponentExample>
</template>
