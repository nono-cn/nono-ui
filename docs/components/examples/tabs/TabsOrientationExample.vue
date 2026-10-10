<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Tabs,
  tabsDefaults,
  tabsOrientations,
  type TabItem,
  type TabsProps,
} from '@/components/ui/Tabs'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const tabs: TabItem[] = [
  { slot: 'general', value: 'general', label: 'General' },
  { slot: 'advanced', value: 'advanced', label: 'Advanced' },
]
const orientation = ref<NonNullable<TabsProps['orientation']>>(tabsDefaults.orientation)
const code = computed(
  () => `<script setup lang="ts">
import { Tabs } from '__DOCS_PACKAGE__/components/ui/Tabs'

const tabs = [
  { slot: 'general', value: 'general', label: 'General' },
  { slot: 'advanced', value: 'advanced', label: 'Advanced' },
]
${scriptEnd}

<template>
  <Tabs model-value="general" :tabs="tabs" orientation="${orientation.value}" aria-label="Preferences">
    <template #content-general><p>General preferences.</p></template>
    <template #content-advanced><p>Advanced preferences.</p></template>
  </Tabs>
</template>`,
)

function reset() {
  orientation.value = tabsDefaults.orientation
}
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="Place triggers above or beside their panels."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><ExampleSelectControl v-model="orientation" label="Orientation" :options="tabsOrientations"
    /></template>
    <div class="w-full max-w-xl">
      <Tabs model-value="general" :tabs="tabs" :orientation="orientation" aria-label="Preferences">
        <template #content-general><p>General preferences.</p></template>
        <template #content-advanced><p>Advanced preferences.</p></template>
      </Tabs>
    </div>
  </ComponentExample>
</template>
