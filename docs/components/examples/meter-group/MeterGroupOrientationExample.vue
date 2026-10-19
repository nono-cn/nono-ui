<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  MeterGroup,
  meterGroupDefaults,
  meterGroupOrientations,
  type MeterGroupItem,
  type MeterGroupOrientation,
} from '@/components/ui/MeterGroup'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: MeterGroupItem[] = [
  { label: 'Apps', value: 18 },
  { label: 'Photos', value: 24, color: 'success' },
  { label: 'Videos', value: 16, color: 'warning' },
]
const orientation = ref<MeterGroupOrientation>(meterGroupDefaults.orientation)
const code = computed(
  () => `<script setup lang="ts">
import { MeterGroup, type MeterGroupItem } from '__DOCS_PACKAGE__/components/ui/MeterGroup'

const items: MeterGroupItem[] = [
  { label: 'Apps', value: 18 },
  { label: 'Photos', value: 24, color: 'success' },
  { label: 'Videos', value: 16, color: 'warning' },
]
${scriptEnd}

<template>
  <MeterGroup :items="items" orientation="${orientation.value}" class="w-full max-w-md" />
</template>`,
)

function reset() {
  orientation.value = meterGroupDefaults.orientation
}
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="Lay the track out horizontally or vertically; vertical meters fill from the bottom."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="orientation"
        label="Orientation"
        :options="meterGroupOrientations"
      />
    </template>
    <MeterGroup :items="items" :orientation="orientation" class="w-full max-w-md" />
  </ComponentExample>
</template>
