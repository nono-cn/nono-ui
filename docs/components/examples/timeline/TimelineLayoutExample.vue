<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Timeline,
  timelineAligns,
  timelineDefaults,
  timelineOrientations,
  type TimelineAlign,
} from '@/components/ui/Timeline'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  {
    value: 1,
    label: 'Plan',
    description: 'Agree on the scope.',
    icon: 'fileText' as const,
  },
  {
    value: 2,
    label: 'Build',
    description: 'Implement the work.',
    icon: 'folderOpen' as const,
  },
  { value: 3, label: 'Launch', description: 'Release to users.', icon: 'check' as const },
]
const orientation = ref<(typeof timelineOrientations)[number]>(timelineDefaults.orientation)
const align = ref<TimelineAlign>(timelineDefaults.align)
const reverse = ref(timelineDefaults.reverse)
const timelineClass = computed(() => {
  if (orientation.value !== 'vertical' || align.value === 'alternate') return 'w-full'
  return align.value === 'left' ? 'me-auto w-1/2' : 'ms-auto w-1/2'
})
const code = computed(
  () => `<script setup lang="ts">
import { Timeline } from '__DOCS_PACKAGE__/components/ui/Timeline'

const items = ${JSON.stringify(items, null, 2)}
${scriptEnd}

<template>
  <div class="mx-auto w-full max-w-xl">
    <Timeline :items="items" :model-value="2" orientation="${orientation.value}" align="${align.value}" :reverse="${reverse.value}" class="${timelineClass.value}" />
  </div>
</template>`,
)

function reset() {
  orientation.value = timelineDefaults.orientation
  align.value = timelineDefaults.align
  reverse.value = timelineDefaults.reverse
}
</script>

<template>
  <ComponentExample
    title="Layout"
    description="Choose the timeline direction and where each event appears."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="orientation"
          label="Orientation"
          :options="timelineOrientations"
        />
        <ExampleSelectControl v-model="align" label="Event position" :options="timelineAligns" />
        <ExampleCheckboxControl v-model="reverse" label="Reverse" />
      </div>
    </template>
    <div class="mx-auto w-full max-w-xl">
      <Timeline
        :items="items"
        :model-value="2"
        :orientation="orientation"
        :align="align"
        :reverse="reverse"
        :class="timelineClass"
      />
    </div>
  </ComponentExample>
</template>
