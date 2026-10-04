<script setup lang="ts">
import { LinearChart } from '@/components/ui/LinearChart'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const data = [
  { month: 1, visits: 120 },
  { month: 2, visits: 180 },
  { month: 3, visits: 150 },
  { month: 4, visits: 230 },
  { month: 5, visits: 210 },
]

const code = `<script setup lang="ts">
import { LinearChart } from '__DOCS_PACKAGE__/components/ui/LinearChart'

const data = [
  { month: 1, visits: 120 },
  { month: 2, visits: 180 },
  { month: 3, visits: 150 },
  { month: 4, visits: 230 },
  { month: 5, visits: 210 },
]
${scriptEnd}

<template>
  <LinearChart
    :data="data"
    :x="(point) => point.month"
    :y="(point) => point.visits"
    x-label="Month"
    y-label="Visits"
    aria-label="Visits from month 1 to month 5"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Plot one numeric series with X and Y accessors."
    :code="code"
    :show-reset="false"
  >
    <LinearChart
      :data="data"
      :x="(point) => point.month"
      :y="(point) => point.visits"
      x-label="Month"
      y-label="Visits"
      aria-label="Visits from month 1 to month 5"
    />
  </ComponentExample>
</template>
