<script setup lang="ts">
import { computed, ref } from 'vue'
import { Tabs, type TabItem } from '@/components/ui/Tabs'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const tabs: TabItem[] = [
  { slot: 'overview', value: 'overview', label: 'Overview' },
  { slot: 'details', value: 'details', label: 'Details' },
]
const value = ref('overview')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Tabs } from '__DOCS_PACKAGE__/components/ui/Tabs'

const value = ref('${value.value}')
const tabs = [
  { slot: 'overview', value: 'overview', label: 'Overview' },
  { slot: 'details', value: 'details', label: 'Details' },
]
${scriptEnd}

<template>
  <Tabs v-model="value" :tabs="tabs" aria-label="Product information">
    <template #content-overview><p>Product summary and highlights.</p></template>
    <template #content-details><p>Technical details and specifications.</p></template>
  </Tabs>
</template>`,
)

function reset() {
  value.value = 'overview'
}
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Switch between two content panels."
    :code="code"
    @reset="reset"
  >
    <div class="w-full max-w-xl">
      <Tabs v-model="value" :tabs="tabs" aria-label="Product information">
        <template #content-overview><p>Product summary and highlights.</p></template>
        <template #content-details><p>Technical details and specifications.</p></template>
      </Tabs>
    </div>
  </ComponentExample>
</template>
