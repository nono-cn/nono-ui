<script setup lang="ts">
import { ref } from 'vue'
import { LinearChart, type LinearChartEvents } from '@/components/ui/LinearChart'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const data = [
  { day: 1, value: 12 },
  { day: 2, value: 18 },
  { day: 3, value: 15 },
  { day: 4, value: 24 },
]
const message = ref('Hover over or click the line.')
const events: LinearChartEvents = {
  click: (_event, seriesIndex) => (message.value = `Clicked series ${seriesIndex + 1}`),
  mouseover: (_event, seriesIndex) => (message.value = `Hovering series ${seriesIndex + 1}`),
  mouseleave: () => (message.value = 'Pointer left the line.'),
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { LinearChart, type LinearChartEvents } from '__DOCS_PACKAGE__/components/ui/LinearChart'

const data = [
  { day: 1, value: 12 },
  { day: 2, value: 18 },
  { day: 3, value: 15 },
  { day: 4, value: 24 },
]
const message = ref('Hover over or click the line.')
const events: LinearChartEvents = {
  click: (_event, seriesIndex) => (message.value = 'Clicked series ' + (seriesIndex + 1)),
  mouseover: (_event, seriesIndex) => (message.value = 'Hovering series ' + (seriesIndex + 1)),
  mouseleave: () => (message.value = 'Pointer left the line.'),
}
${scriptEnd}

<template>
  <div class="w-full">
    <LinearChart
      :data="data"
      :x="(point) => point.day"
      :y="(point) => point.value"
      :events="events"
      cursor="pointer"
      aria-label="Interactive values by day"
    />
    <p role="status" class="mt-2 text-center text-sm text-muted-foreground">{{ message }}</p>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Line events"
    description="Handle click, mouseover, and mouseleave on a line."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full">
      <LinearChart
        :data="data"
        :x="(point) => point.day"
        :y="(point) => point.value"
        :events="events"
        cursor="pointer"
        aria-label="Interactive values by day"
      />
      <p role="status" class="mt-2 text-center text-sm text-muted-foreground">{{ message }}</p>
    </div>
  </ComponentExample>
</template>
