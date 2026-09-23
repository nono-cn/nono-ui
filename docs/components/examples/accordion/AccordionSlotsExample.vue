<script setup lang="ts">
import { Accordion } from '@/components/ui/Accordion'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  {
    value: 'account',
    label: 'Account',
    description: 'Manage your personal details and preferences.',
    slot: 'account',
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
    slot: 'account',
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
  <Accordion :items="items">
    <template #label-account="{ item, open }">
      <span class="flex items-center gap-2">
        {{ item.label }}
        <span class="text-xs text-muted-foreground">
          {{ open ? 'Open' : 'Closed' }}
        </span>
      </span>
    </template>
    <template #content-account="{ item }">
      <p>{{ item.description }} Add custom content here.</p>
    </template>
  </Accordion>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots example"
    description="Use item.slot to customize a section’s label and content."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Accordion :items="items">
        <template #label-account="{ item, open }">
          <span class="flex items-center gap-2">
            {{ item.label }}
            <span class="text-xs text-muted-foreground">
              {{ open ? 'Open' : 'Closed' }}
            </span>
          </span>
        </template>
        <template #content-account="{ item }">
          <p>{{ item.description }} Add custom content here.</p>
        </template>
      </Accordion>
    </div>
  </ComponentExample>
</template>
