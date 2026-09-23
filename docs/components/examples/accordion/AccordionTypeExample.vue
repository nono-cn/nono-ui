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
  <div class="grid w-full max-w-3xl gap-2">
    <h4 class="text-sm font-medium">Multiple</h4>
    <Accordion type="multiple" :items="items" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Type"
    description="Allow multiple sections to stay open at the same time."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-3xl gap-2">
      <h4 class="text-sm font-medium">Multiple</h4>
      <Accordion type="multiple" :items="items" />
    </div>
  </ComponentExample>
</template>
