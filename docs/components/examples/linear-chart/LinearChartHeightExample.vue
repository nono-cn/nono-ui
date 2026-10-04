<script setup lang="ts">
import { computed, ref } from 'vue'
import { LinearChart } from '@/components/ui/LinearChart'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const data = [
  { day: 1, value: 12 },
  { day: 2, value: 18 },
  { day: 3, value: 15 },
  { day: 4, value: 24 },
]
const height = ref('240')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { LinearChart } from '__DOCS_PACKAGE__/components/ui/LinearChart'

const data = [
  { day: 1, value: 12 },
  { day: 2, value: 18 },
  { day: 3, value: 15 },
  { day: 4, value: 24 },
]
const height = ref('${height.value}')
${scriptEnd}

<template>
  <LinearChart
    :data="data"
    :x="(point) => point.day"
    :y="(point) => point.value"
    :height="Number(height)"
    aria-label="Values by day"
  />
</template>`,
)
</script>

<template>
  <ComponentExample
    title="Chart height"
    description="Set the height passed to the chart container."
    :code="code"
    @reset="height = '240'"
  >
    <template #controls>
      <ExampleSelectControl v-model="height" label="Height (px)" :options="['160', '240', '320']" />
    </template>
    <LinearChart
      :data="data"
      :x="(point) => point.day"
      :y="(point) => point.value"
      :height="Number(height)"
      aria-label="Values by day"
    />
  </ComponentExample>
</template>
