<script setup lang="ts">
import { computed, ref } from 'vue'
import { MeterGroup, type MeterGroupItem } from '@/components/ui/MeterGroup'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: MeterGroupItem[] = [
  { label: 'Apps', value: 18 },
  { label: 'Photos', value: 24, color: 'success' },
  { label: 'Videos', value: 16, color: 'warning' },
]
const status = ref(true)
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
  <MeterGroup :items="items" :status="${status.value}" class="w-full max-w-md" />
</template>`,
)

function reset() {
  status.value = true
}
</script>

<template>
  <ComponentExample
    title="Status"
    description="Show the total percentage above the track."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="status" label="Status" />
    </template>
    <MeterGroup :items="items" :status="status" class="w-full max-w-md" />
  </ComponentExample>
</template>
