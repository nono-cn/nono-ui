<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  LinearChart,
  linearChartCurveTypes,
  linearChartDefaults,
  type LinearChartCurveType,
} from '@/components/ui/LinearChart'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const data = [
  { x: 0, y: 8 },
  { x: 1, y: 15 },
  { x: 2, y: 10 },
  { x: 3, y: 22 },
  { x: 4, y: 18 },
]
const curveType = ref<LinearChartCurveType>(linearChartDefaults.curveType)
const dashed = ref(false)
const color = ref('var(--chart-1)')
const lineWidth = ref('2')
const lineDashArray = computed(() => (dashed.value ? [6, 3] : undefined))
const code = computed(
  () => `<script setup lang="ts">
import { computed, ref } from 'vue'
import { LinearChart, type LinearChartCurveType } from '__DOCS_PACKAGE__/components/ui/LinearChart'

const data = [
  { x: 0, y: 8 },
  { x: 1, y: 15 },
  { x: 2, y: 10 },
  { x: 3, y: 22 },
  { x: 4, y: 18 },
]
const curveType = ref<LinearChartCurveType>('${curveType.value}')
const dashed = ref(${dashed.value})
const color = ref('${color.value}')
const lineWidth = ref('${lineWidth.value}')
const lineDashArray = computed(() => (dashed.value ? [6, 3] : undefined))
${scriptEnd}

<template>
  <LinearChart
    :data="data"
    :x="(point) => point.x"
    :y="(point) => point.y"
    :curve-type="curveType"
    :line-dash-array="lineDashArray"
    :line-width="Number(lineWidth)"
    :color="color"
    aria-label="Line appearance example"
  />
</template>`,
)

function reset() {
  curveType.value = linearChartDefaults.curveType
  dashed.value = false
  color.value = 'var(--chart-1)'
  lineWidth.value = '2'
}
</script>

<template>
  <ComponentExample
    title="Line appearance"
    description="Choose the interpolation curve and a dashed stroke."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap items-end gap-4">
        <ExampleSelectControl v-model="curveType" label="Curve" :options="linearChartCurveTypes" />
        <ExampleCheckboxControl v-model="dashed" label="Dashed line" />
        <ExampleSelectControl
          v-model="color"
          label="Color"
          :options="['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)']"
        />
        <ExampleSelectControl
          v-model="lineWidth"
          label="Line width"
          :options="['1', '2', '3', '4']"
        />
      </div>
    </template>
    <LinearChart
      :data="data"
      :x="(point) => point.x"
      :y="(point) => point.y"
      :curve-type="curveType"
      :line-dash-array="lineDashArray"
      :line-width="Number(lineWidth)"
      :color="color"
      aria-label="Line appearance example"
    />
  </ComponentExample>
</template>
