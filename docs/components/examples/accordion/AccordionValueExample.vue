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
  <div class="grid w-full max-w-2xl gap-3">
    <Accordion v-model:value="value" :items="items" />
    <output class="text-sm text-muted-foreground">
      Open section: {{ value ?? 'none' }}
    </output>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Value"
    description="Bind the open value and reflect changes in Vue state."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-2xl gap-3">
      <Accordion v-model:value="value" :items="items" />
      <output class="text-sm text-muted-foreground"> Open section: {{ value ?? 'none' }} </output>
    </div>
  </ComponentExample>
</template>
