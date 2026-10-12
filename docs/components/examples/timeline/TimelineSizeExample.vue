<script setup lang="ts">
import { computed, ref } from 'vue'
import { Timeline, timelineDefaults, timelineSizes } from '@/components/ui/Timeline'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  {
    value: 'draft',
    label: 'Draft',
    description: 'Preparing the content.',
    icon: 'fileText' as const,
  },
  {
    value: 'review',
    label: 'Review',
    description: 'Checking the details.',
    icon: 'search' as const,
  },
  { value: 'publish', label: 'Publish', description: 'Ready to share.', icon: 'check' as const },
]
const size = ref<(typeof timelineSizes)[number]>(timelineDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { Timeline } from '__DOCS_PACKAGE__/components/ui/Timeline'

const items = ${JSON.stringify(items, null, 2)}
${scriptEnd}

<template>
  <Timeline :items="items" model-value="review" size="${size.value}" />
</template>`,
)

function reset() {
  size.value = timelineDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Change the indicator and icon size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="size" label="Size" :options="timelineSizes" />
    </template>
    <div class="w-full max-w-xl">
      <Timeline :items="items" model-value="review" :size="size" />
    </div>
  </ComponentExample>
</template>
