<script setup lang="ts">
import { computed, ref } from 'vue'
import { MeterGroup, meterGroupDefaults, type MeterGroupItem } from '@/components/ui/MeterGroup'
import ExampleNumberControl from '../../controls/ExampleNumberControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: MeterGroupItem[] = [
  { label: 'Apps', value: 40 },
  { label: 'Photos', value: 50, color: 'success' },
  { label: 'Videos', value: 30, color: 'warning' },
]
const max = ref(meterGroupDefaults.max)
const code = computed(
  () => `<script setup lang="ts">
import { MeterGroup, type MeterGroupItem } from '__DOCS_PACKAGE__/components/ui/MeterGroup'

const items: MeterGroupItem[] = [
  { label: 'Apps', value: 40 },
  { label: 'Photos', value: 50, color: 'success' },
  { label: 'Videos', value: 30, color: 'warning' },
]
${scriptEnd}

<template>
  <MeterGroup :items="items" :max="${max.value}" status class="w-full max-w-md" />
</template>`,
)

function reset() {
  max.value = meterGroupDefaults.max
}
</script>

<template>
  <ComponentExample
    title="Max"
    description="Set the maximum value; when the total exceeds it, the items scale to fit the track."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleNumberControl v-model="max" label="Max" :min="1" />
    </template>
    <MeterGroup :items="items" :max="max" status class="w-full max-w-md" />
  </ComponentExample>
</template>
