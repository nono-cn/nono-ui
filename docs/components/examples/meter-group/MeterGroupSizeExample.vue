<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  MeterGroup,
  meterGroupDefaults,
  meterGroupSizes,
  type MeterGroupItem,
  type MeterGroupSize,
} from '@/components/ui/MeterGroup'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: MeterGroupItem[] = [
  { label: 'Apps', value: 18 },
  { label: 'Photos', value: 24, color: 'success' },
  { label: 'Videos', value: 16, color: 'warning' },
]
const size = ref<MeterGroupSize>(meterGroupDefaults.size)
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
  <MeterGroup :items="items" size="${size.value}" class="w-full max-w-md" />
</template>`,
)

function reset() {
  size.value = meterGroupDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Change the track thickness, legend marker, icon, and text size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="size" label="Size" :options="meterGroupSizes" />
    </template>
    <MeterGroup :items="items" :size="size" class="w-full max-w-md" />
  </ComponentExample>
</template>
