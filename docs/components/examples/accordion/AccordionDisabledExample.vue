<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '@/components/ui/Accordion'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const rootDisabledValue = ref<string | undefined>('account')
const rootDisabledItems = [
  {
    value: 'account',
    label: 'Account',
    description: 'This entire accordion is disabled.',
  },
  {
    value: 'security',
    label: 'Security',
    description: 'This entire accordion is disabled.',
  },
  {
    value: 'notifications',
    label: 'Notifications',
    description: 'This entire accordion is disabled.',
  },
]

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '__DOCS_PACKAGE__/components/ui/Accordion'

const rootDisabledValue = ref<string | undefined>('account')
const rootDisabledItems = [
  {
    value: 'account',
    label: 'Account',
    description: 'This entire accordion is disabled.',
  },
  {
    value: 'security',
    label: 'Security',
    description: 'This entire accordion is disabled.',
  },
  {
    value: 'notifications',
    label: 'Notifications',
    description: 'This entire accordion is disabled.',
  },
]
${scriptEnd}

<template>
  <div class="w-full max-w-2xl">
    <Accordion v-model:value="rootDisabledValue" :items="rootDisabledItems" disabled />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Disable the entire accordion and all of its items."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Accordion v-model:value="rootDisabledValue" :items="rootDisabledItems" disabled />
    </div>
  </ComponentExample>
</template>
