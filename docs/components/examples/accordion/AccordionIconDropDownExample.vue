<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '@/components/ui/Accordion'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref<string | undefined>('account')
const items = [
  {
    value: 'account',
    label: 'Account',
    description: 'Manage your personal details and preferences.',
  },
  {
    value: 'security',
    label: 'Security',
    description: 'Update your password and authentication settings.',
  },
  {
    value: 'notifications',
    label: 'Notifications',
    description: 'Choose which notifications you want to receive.',
  },
]

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '__DOCS_PACKAGE__/components/ui/Accordion'

const value = ref<string | undefined>('account')
const items = [
  {
    value: 'account',
    label: 'Account',
    description: 'Manage your personal details and preferences.',
  },
  {
    value: 'security',
    label: 'Security',
    description: 'Update your password and authentication settings.',
  },
  {
    value: 'notifications',
    label: 'Notifications',
    description: 'Choose which notifications you want to receive.',
  },
]
${scriptEnd}

<template>
  <Accordion
    v-model:value="value"
    collapsible
    :items="items"
    :icon-drop-down-open="{ name: 'minus' }"
    :icon-drop-down-close="{ name: 'plus' }"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Dropdown icon"
    description="Change the trigger icons based on whether a section is open or closed."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Accordion
        v-model:value="value"
        collapsible
        :items="items"
        :icon-drop-down-open="{ name: 'minus' }"
        :icon-drop-down-close="{ name: 'plus' }"
      />
    </div>
  </ComponentExample>
</template>
