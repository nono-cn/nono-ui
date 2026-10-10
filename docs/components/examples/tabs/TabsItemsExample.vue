<script setup lang="ts">
import { computed, ref } from 'vue'
import { Tabs, type TabItem } from '@/components/ui/Tabs'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const disableReports = ref(true)
const tabs = computed<TabItem[]>(() => [
  { slot: 'home', value: 'home', label: 'Home', icon: 'folder' },
  {
    slot: 'reports',
    value: 'reports',
    label: 'Reports',
    icon: 'fileText',
    disabled: disableReports.value,
  },
])
const code = computed(
  () => `<script setup lang="ts">
import { Tabs } from '__DOCS_PACKAGE__/components/ui/Tabs'

const tabs = [
  { slot: 'home', value: 'home', label: 'Home', icon: 'folder' },
  { slot: 'reports', value: 'reports', label: 'Reports', icon: 'fileText', disabled: ${disableReports.value} },
]
${scriptEnd}

<template>
  <Tabs model-value="home" :tabs="tabs" aria-label="Workspace">
    <template #content-home><p>Workspace overview.</p></template>
    <template #content-reports><p>Report list.</p></template>
  </Tabs>
</template>`,
)

function reset() {
  disableReports.value = true
}
</script>

<template>
  <ComponentExample
    title="Items"
    description="Configure labels, icons, and disabled tabs."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><ExampleCheckboxControl v-model="disableReports" label="Disable Reports"
    /></template>
    <div class="w-full max-w-xl">
      <Tabs model-value="home" :tabs="tabs" aria-label="Workspace">
        <template #content-home><p>Workspace overview.</p></template>
        <template #content-reports><p>Report list.</p></template>
      </Tabs>
    </div>
  </ComponentExample>
</template>
