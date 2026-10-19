<script setup lang="ts">
import { computed, ref } from 'vue'
import { MeterGroup, type MeterGroupItem, type MeterGroupUI } from '@/components/ui/MeterGroup'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: MeterGroupItem[] = [
  { label: 'Apps', value: 18 },
  { label: 'Photos', value: 24, color: 'success' },
  { label: 'Videos', value: 16, color: 'warning' },
]
const squareTrack = ref(true)
const dividers = ref(true)
const highlightLargest = ref(false)
const ui = computed<MeterGroupUI>(() => ({
  track: () => ({ class: squareTrack.value ? 'rounded-none' : '' }),
  indicator: ({ index }) => ({
    class: dividers.value && index > 0 ? 'border-l-2 border-background' : '',
  }),
  label: ({ value }) => ({
    class: highlightLargest.value && value >= 24 ? 'font-semibold text-foreground' : '',
  }),
}))
const code = computed(
  () => `<script setup lang="ts">
import { MeterGroup, type MeterGroupItem, type MeterGroupUI } from '__DOCS_PACKAGE__/components/ui/MeterGroup'

const items: MeterGroupItem[] = [
  { label: 'Apps', value: 18 },
  { label: 'Photos', value: 24, color: 'success' },
  { label: 'Videos', value: 16, color: 'warning' },
]
const ui: MeterGroupUI = {
  track: () => ({ class: '${squareTrack.value ? 'rounded-none' : ''}' }),
  indicator: ({ index }) => ({
    class: ${dividers.value ? `index > 0 ? 'border-l-2 border-background' : ''` : `''`},
  }),
  label: ({ value }) => ({
    class: ${highlightLargest.value ? `value >= 24 ? 'font-semibold text-foreground' : ''` : `''`},
  }),
}
${scriptEnd}

<template>
  <MeterGroup :items="items" :ui="ui" size="lg" class="w-full max-w-md" />
</template>`,
)

function reset() {
  squareTrack.value = true
  dividers.value = true
  highlightLargest.value = false
}
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize the track, each indicator, and each legend part using their context."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleCheckboxControl v-model="squareTrack" label="Square track" />
        <ExampleCheckboxControl v-model="dividers" label="Dividers" />
        <ExampleCheckboxControl v-model="highlightLargest" label="Highlight largest" />
      </div>
    </template>
    <MeterGroup :items="items" :ui="ui" size="lg" class="w-full max-w-md" />
  </ComponentExample>
</template>
