<script setup lang="ts">
import { Accordion } from '@/components/ui/Accordion'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

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
import { Accordion } from '__DOCS_PACKAGE__/components/ui/Accordion'

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
  <Accordion :items="items" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Define each section with a value, title, and description."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Accordion :items="items" />
    </div>
  </ComponentExample>
</template>
