<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Tabs,
  tabsActivationModes,
  tabsDefaults,
  type TabItem,
  type TabsProps,
} from '@/components/ui/Tabs'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const tabs: TabItem[] = [
  { slot: 'first', value: 'first', label: 'First' },
  { slot: 'second', value: 'second', label: 'Second' },
  { slot: 'third', value: 'third', label: 'Third' },
]
const activationMode = ref<NonNullable<TabsProps['activationMode']>>(tabsDefaults.activationMode)
const loop = ref(tabsDefaults.loop)
const code = computed(
  () => `<script setup lang="ts">
import { Tabs } from '__DOCS_PACKAGE__/components/ui/Tabs'

const tabs = [
  { slot: 'first', value: 'first', label: 'First' },
  { slot: 'second', value: 'second', label: 'Second' },
  { slot: 'third', value: 'third', label: 'Third' },
]
${scriptEnd}

<template>
  <Tabs model-value="first" :tabs="tabs" activation-mode="${activationMode.value}" :loop="${loop.value}" aria-label="Keyboard navigation">
    <template #content-first><p>First panel.</p></template>
    <template #content-second><p>Second panel.</p></template>
    <template #content-third><p>Third panel.</p></template>
  </Tabs>
</template>`,
)

function reset() {
  activationMode.value = tabsDefaults.activationMode
  loop.value = tabsDefaults.loop
}
</script>

<template>
  <ComponentExample
    title="Keyboard behavior"
    description="Choose automatic or manual activation and whether arrow navigation wraps."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="activationMode"
          label="Activation"
          :options="tabsActivationModes"
        />
        <ExampleCheckboxControl v-model="loop" label="Loop navigation" />
      </div>
    </template>
    <div class="w-full max-w-xl">
      <Tabs
        model-value="first"
        :tabs="tabs"
        :activation-mode="activationMode"
        :loop="loop"
        aria-label="Keyboard navigation"
      >
        <template #content-first><p>First panel.</p></template>
        <template #content-second><p>Second panel.</p></template>
        <template #content-third><p>Third panel.</p></template>
      </Tabs>
    </div>
  </ComponentExample>
</template>
