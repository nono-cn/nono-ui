<script setup lang="ts">
import { computed, ref } from 'vue'
import { Timeline, timelineDefaults } from '@/components/ui/Timeline'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
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
const colors = [...themeColors, 'custom']
const choice = ref<string>(timelineDefaults.color)
const customColor = ref('#8b5cf6')
const color = computed(() => (choice.value === 'custom' ? customColor.value : choice.value))
const code = computed(
  () => `<script setup lang="ts">
import { Timeline } from '__DOCS_PACKAGE__/components/ui/Timeline'

const items = ${JSON.stringify(items, null, 2)}
${scriptEnd}

<template>
  <Timeline :items="items" model-value="review" color="${color.value}" />
</template>`,
)

function reset() {
  choice.value = timelineDefaults.color
  customColor.value = '#8b5cf6'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme token or custom CSS color for the indicator and completed separator."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="choice" label="Color" :options="colors" />
        <ExampleColorControl
          v-if="choice === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
      </div>
    </template>
    <div class="w-full max-w-xl">
      <Timeline :items="items" model-value="review" :color="color" />
    </div>
  </ComponentExample>
</template>
