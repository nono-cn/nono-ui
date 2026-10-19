<script setup lang="ts">
import { computed, ref } from 'vue'
import { MeterGroup, meterGroupItemDefaults } from '@/components/ui/MeterGroup'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const choice = ref<string>(meterGroupItemDefaults.color)
const customColor = ref('#8b5cf6')
const color = computed(() => (choice.value === 'custom' ? customColor.value : choice.value))
const items = computed(() => [
  { label: 'Used', value: 42, color: color.value },
  { label: 'Reserved', value: 12, color: 'neutral' },
])
const code = computed(
  () => `<script setup lang="ts">
import { MeterGroup } from '__DOCS_PACKAGE__/components/ui/MeterGroup'

const items = [
  { label: 'Used', value: 42, color: '${color.value}' },
  { label: 'Reserved', value: 12, color: 'neutral' },
]
${scriptEnd}

<template>
  <MeterGroup :items="items" class="w-full max-w-md" />
</template>`,
)

function reset() {
  choice.value = meterGroupItemDefaults.color
  customColor.value = '#8b5cf6'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme color or custom CSS color for each item."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="choice"
          label="Color"
          :options="[...themeColors, 'custom']"
        />
        <ExampleColorControl
          v-if="choice === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
      </div>
    </template>
    <MeterGroup :items="items" class="w-full max-w-md" />
  </ComponentExample>
</template>
