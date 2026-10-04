<script setup lang="ts">
import { computed, ref } from 'vue'
import { LinearChart } from '@/components/ui/LinearChart'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const data = [
  { day: 1, value: 12 },
  { day: 2, value: 17 },
  { day: 3, value: 14 },
  { day: 4, value: 25 },
  { day: 5, value: 21 },
]
const tooltip = ref(true)
const crosshair = ref(false)
const highlightOnHover = ref(true)
const cursor = ref('default')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { LinearChart } from '__DOCS_PACKAGE__/components/ui/LinearChart'

const data = [
  { day: 1, value: 12 },
  { day: 2, value: 17 },
  { day: 3, value: 14 },
  { day: 4, value: 25 },
  { day: 5, value: 21 },
]
const tooltip = ref(${tooltip.value})
const crosshair = ref(${crosshair.value})
const highlightOnHover = ref(${highlightOnHover.value})
const cursor = ref('${cursor.value}')
${scriptEnd}

<template>
  <LinearChart
    :data="data"
    :x="(point) => point.day"
    :y="(point) => point.value"
    :tooltip="tooltip"
    :crosshair="crosshair"
    :highlight-on-hover="highlightOnHover"
    :cursor="cursor"
    aria-label="Daily values"
  />
</template>`,
)

function reset() {
  tooltip.value = true
  crosshair.value = false
  highlightOnHover.value = true
  cursor.value = 'default'
}
</script>

<template>
  <ComponentExample
    title="Interaction"
    description="Show a tooltip, crosshair, and hover highlighting. A tooltip also enables the crosshair."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleCheckboxControl v-model="tooltip" label="Tooltip" />
        <ExampleCheckboxControl v-model="crosshair" label="Crosshair" />
        <ExampleCheckboxControl v-model="highlightOnHover" label="Highlight on hover" />
        <ExampleSelectControl
          v-model="cursor"
          label="Cursor"
          :options="['default', 'pointer', 'crosshair']"
        />
      </div>
    </template>
    <LinearChart
      :data="data"
      :x="(point) => point.day"
      :y="(point) => point.value"
      :tooltip="tooltip"
      :crosshair="crosshair"
      :highlight-on-hover="highlightOnHover"
      :cursor="cursor"
      aria-label="Daily values"
    />
  </ComponentExample>
</template>
