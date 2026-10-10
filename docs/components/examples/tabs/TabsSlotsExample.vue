<script setup lang="ts">
import { computed, ref } from 'vue'
import { Tabs, type TabItem } from '@/components/ui/Tabs'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const tabs: TabItem[] = [
  { slot: 'profile', value: 'profile', label: 'Profile' },
  { slot: 'activity', value: 'activity', label: 'Activity' },
]
const value = ref('profile')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Tabs } from '__DOCS_PACKAGE__/components/ui/Tabs'

const value = ref('${value.value}')
const tabs = [
  { slot: 'profile', value: 'profile', label: 'Profile' },
  { slot: 'activity', value: 'activity', label: 'Activity' },
]
${scriptEnd}

<template>
  <Tabs v-model="value" :tabs="tabs" aria-label="Member profile">
    <template #leading-profile>●</template>
    <template #label-activity>Recent activity</template>
    <template #content-profile><p>Profile information.</p></template>
    <template #content-activity><p>Recent account activity.</p></template>
  </Tabs>
</template>`,
)

function reset() {
  value.value = 'profile'
}
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Customize a specific trigger or panel using its slot key."
    :code="code"
    @reset="reset"
  >
    <div class="w-full max-w-xl">
      <Tabs v-model="value" :tabs="tabs" aria-label="Member profile">
        <template #leading-profile>●</template>
        <template #label-activity>Recent activity</template>
        <template #content-profile><p>Profile information.</p></template>
        <template #content-activity><p>Recent account activity.</p></template>
      </Tabs>
    </div>
  </ComponentExample>
</template>
