<script setup lang="ts">
import { LinearChart } from '@/components/ui/LinearChart'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const data = [
  { date: new Date(2026, 0, 1), visits: 120 },
  { date: new Date(2026, 1, 1), visits: 180 },
  { date: new Date(2026, 2, 1), visits: 150 },
  { date: new Date(2026, 3, 1), visits: 230 },
]
const formatDate = (value: number | Date) =>
  new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' }).format(new Date(value))

const code = `<script setup lang="ts">
import { LinearChart } from '__DOCS_PACKAGE__/components/ui/LinearChart'

const data = [
  { date: new Date(2026, 0, 1), visits: 120 },
  { date: new Date(2026, 1, 1), visits: 180 },
  { date: new Date(2026, 2, 1), visits: 150 },
  { date: new Date(2026, 3, 1), visits: 230 },
]
const formatDate = (value: number | Date) =>
  new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' }).format(new Date(value))
${scriptEnd}

<template>
  <LinearChart
    :data="data"
    :x="(point) => point.date"
    :y="(point) => point.visits"
    :x-tick-format="formatDate"
    x-label="Month"
    aria-label="Monthly visits from January to April 2026"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Date values"
    description="Use Date values on the X axis and format their ticks."
    :code="code"
    :show-reset="false"
  >
    <LinearChart
      :data="data"
      :x="(point) => point.date"
      :y="(point) => point.visits"
      :x-tick-format="formatDate"
      x-label="Month"
      aria-label="Monthly visits from January to April 2026"
    />
  </ComponentExample>
</template>
