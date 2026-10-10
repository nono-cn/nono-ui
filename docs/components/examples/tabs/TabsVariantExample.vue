<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Tabs,
  tabsDefaults,
  tabsVariantNames,
  type TabItem,
  type TabsVariants,
} from '@/components/ui/Tabs'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const tabs: TabItem[] = [
  { slot: 'account', value: 'account', label: 'Account' },
  { slot: 'security', value: 'security', label: 'Security' },
]
const variant = ref<NonNullable<TabsVariants['variant']>>(tabsDefaults.variant)
const code = computed(
  () => `<script setup lang="ts">
import { Tabs } from '__DOCS_PACKAGE__/components/ui/Tabs'

const tabs = [
  { slot: 'account', value: 'account', label: 'Account' },
  { slot: 'security', value: 'security', label: 'Security' },
]
${scriptEnd}

<template>
  <Tabs model-value="account" :tabs="tabs" variant="${variant.value}" aria-label="Settings">
    <template #content-account><p>Account settings.</p></template>
    <template #content-security><p>Security settings.</p></template>
  </Tabs>
</template>`,
)

function reset() {
  variant.value = tabsDefaults.variant
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Choose the default or line tab style."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><ExampleSelectControl v-model="variant" label="Variant" :options="tabsVariantNames"
    /></template>
    <div class="w-full max-w-xl">
      <Tabs model-value="account" :tabs="tabs" :variant="variant" aria-label="Settings">
        <template #content-account><p>Account settings.</p></template>
        <template #content-security><p>Security settings.</p></template>
      </Tabs>
    </div>
  </ComponentExample>
</template>
