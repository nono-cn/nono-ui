<script setup lang="ts">
import { computed, ref } from 'vue'
import { Accordion, accordionTypes } from '@/components/ui/Accordion'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const type = ref<(typeof accordionTypes)[number]>('multiple')

const items = [
  {
    value: 'account',
    label: 'Account',
    description: 'Manage your personal details and preferences.',
    icon: 'user',
  },
  {
    value: 'security',
    label: 'Security',
    description: 'Update your password and authentication settings.',
    icon: 'warning',
  },
  {
    value: 'notifications',
    label: 'Notifications',
    description: 'Choose which notifications you want to receive.',
    icon: 'info',
  },
]

const value = computed(() => (type.value === 'multiple' ? ['account', 'security'] : 'account'))
const code = computed(
  () => `<script setup lang="ts">
import { Accordion } from '__DOCS_PACKAGE__/components/ui/Accordion'

const items = [
  {
    value: 'account',
    label: 'Account',
    description: 'Manage your personal details and preferences.',
    icon: 'user',
  },
  {
    value: 'security',
    label: 'Security',
    description: 'Update your password and authentication settings.',
    icon: 'warning',
  },
  {
    value: 'notifications',
    label: 'Notifications',
    description: 'Choose which notifications you want to receive.',
    icon: 'info',
  },
]
${scriptEnd}

<template>
  <Accordion type="${type.value}" :value="${type.value === 'multiple' ? "['account', 'security']" : "'account'"}" :items="items" />
</template>`,
)

function reset() {
  type.value = 'multiple'
}
</script>

<template>
  <ComponentExample
    title="Type"
    description="Choose whether one or multiple sections can stay open."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="type" label="Type" :options="accordionTypes" />
      </div>
    </template>
    <div class="w-full max-w-3xl">
      <Accordion :type="type" :value="value" :items="items" />
    </div>
  </ComponentExample>
</template>
