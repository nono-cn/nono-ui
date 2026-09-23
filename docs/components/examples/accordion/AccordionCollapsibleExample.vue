<script setup lang="ts">
import { ref } from 'vue'
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
const collapsibleValue = ref<string | undefined>('security')

const code = `<script setup lang="ts">
import { ref } from 'vue'
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
const collapsibleValue = ref<string | undefined>('security')
${scriptEnd}

<template>
  <div class="w-full max-w-2xl">
    <Accordion v-model:value="collapsibleValue" type="single" collapsible :items="items" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Collapsible"
    description="In single mode, the open section can be closed by activating it again."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Accordion v-model:value="collapsibleValue" type="single" collapsible :items="items" />
    </div>
  </ComponentExample>
</template>
