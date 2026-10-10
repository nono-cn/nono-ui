<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Tabs,
  tabsDefaults,
  tabsVariantNames,
  type TabItem,
  type TabsVariants,
} from '@/components/ui/Tabs'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const tabs: TabItem[] = [
  { slot: 'overview', value: 'overview', label: 'Overview' },
  { slot: 'details', value: 'details', label: 'Details' },
]
const choice = ref<string>(tabsDefaults.color)
const customColor = ref('#8b5cf6')
const color = computed(() => (choice.value === 'custom' ? customColor.value : choice.value))
const variant = ref<NonNullable<TabsVariants['variant']>>(tabsDefaults.variant)
const code = computed(
  () => `<script setup lang="ts">
import { Tabs } from '__DOCS_PACKAGE__/components/ui/Tabs'

const tabs = [
  { slot: 'overview', value: 'overview', label: 'Overview' },
  { slot: 'details', value: 'details', label: 'Details' },
]
${scriptEnd}

<template>
  <Tabs model-value="overview" :tabs="tabs" color="${color.value}" variant="${variant.value}" aria-label="Product information">
    <template #content-overview><p>Product overview.</p></template>
    <template #content-details><p>Technical details.</p></template>
  </Tabs>
</template>`,
)

function reset() {
  choice.value = tabsDefaults.color
  customColor.value = '#8b5cf6'
  variant.value = tabsDefaults.variant
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme color or custom CSS color for the active tab."
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
        <ExampleSelectControl v-model="variant" label="Variant" :options="tabsVariantNames" />
      </div>
    </template>
    <div class="w-full max-w-xl">
      <Tabs
        model-value="overview"
        :tabs="tabs"
        :color="color"
        :variant="variant"
        aria-label="Product information"
      >
        <template #content-overview><p>Product overview.</p></template>
        <template #content-details><p>Technical details.</p></template>
      </Tabs>
    </div>
  </ComponentExample>
</template>
