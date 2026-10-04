<script setup lang="ts">
import { LinearChart } from '@/components/ui/LinearChart'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const data = [
  { month: 'Jan', visits: 120, signups: 48 },
  { month: 'Feb', visits: 180, signups: 62 },
  { month: 'Mar', visits: 150, signups: 55 },
  { month: 'Apr', visits: 230, signups: 91 },
]

const code = `<script setup lang="ts">
import { LinearChart } from '__DOCS_PACKAGE__/components/ui/LinearChart'

const data = [
  { month: 'Jan', visits: 120, signups: 48 },
  { month: 'Feb', visits: 180, signups: 62 },
  { month: 'Mar', visits: 150, signups: 55 },
  { month: 'Apr', visits: 230, signups: 91 },
]
${scriptEnd}

<template>
  <LinearChart
    :data="data"
    :x="(point) => point.month"
    :y="[(point) => point.visits, (point) => point.signups]"
    :colors="['var(--chart-1)', 'var(--chart-2)']"
    x-label="Month"
    aria-label="Monthly visits and signups"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Multiple series"
    description="Pass multiple Y accessors and one color per series. String X values become categories."
    :code="code"
    :show-reset="false"
  >
    <LinearChart
      :data="data"
      :x="(point) => point.month"
      :y="[(point) => point.visits, (point) => point.signups]"
      :colors="['var(--chart-1)', 'var(--chart-2)']"
      x-label="Month"
      aria-label="Monthly visits and signups"
    />
  </ComponentExample>
</template>
