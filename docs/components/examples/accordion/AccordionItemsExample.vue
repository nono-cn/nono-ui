<script setup lang="ts">
import { Accordion } from '@/components/ui/Accordion'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  {
    value: 'account',
    label: 'Account',
    description: 'Manage your personal details and preferences.',
    icon: { name: 'user' },
  },
  {
    value: 'notifications',
    label: 'Notifications',
    description: 'Choose which notifications you want to receive.',
    icon: { name: 'info' },
    disabled: true,
  },
  {
    value: 'security',
    label: 'Security',
    description: 'Update your password and authentication settings.',
    icon: { name: 'warning' },
  },
]

const code = `<script setup lang="ts">
import { Accordion } from '__DOCS_PACKAGE__/components/ui/Accordion'

const items = [
  {
    value: 'account',
    label: 'Account',
    description: 'Manage your personal details and preferences.',
    icon: { name: 'user' },
  },
  {
    value: 'notifications',
    label: 'Notifications',
    description: 'Choose which notifications you want to receive.',
    icon: { name: 'info' },
    disabled: true,
  },
  {
    value: 'security',
    label: 'Security',
    description: 'Update your password and authentication settings.',
    icon: { name: 'warning' },
  },
]
${scriptEnd}

<template>
  <Accordion :items="items" />
</template>`
</script>

<template>
  <ComponentExample
    title="Items"
    description="Each item can define its label, description, icon, and state."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Accordion :items="items" />
    </div>
  </ComponentExample>
</template>
