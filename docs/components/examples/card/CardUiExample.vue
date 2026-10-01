<script setup lang="ts">
import { Card, type CardUI } from '@/components/ui/Card'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const ui: CardUI = {
  header: () => ({ class: 'border-b border-dashed pb-6' }),
  label: () => ({ class: 'text-primary' }),
  description: () => ({ class: 'italic' }),
  action: () => ({ class: 'rounded-md bg-muted px-2 py-1 text-xs' }),
  content: () => ({ class: 'text-sm' }),
  footer: () => ({ class: 'border-t pt-6 text-xs text-muted-foreground' }),
}

const code = `<script setup lang="ts">
import { Card, type CardUI } from '__DOCS_PACKAGE__/components/ui/Card'

const ui: CardUI = {
  header: () => ({ class: 'border-b border-dashed pb-6' }),
  label: () => ({ class: 'text-primary' }),
  description: () => ({ class: 'italic' }),
  action: () => ({ class: 'rounded-md bg-muted px-2 py-1 text-xs' }),
  content: () => ({ class: 'text-sm' }),
  footer: () => ({ class: 'border-t pt-6 text-xs text-muted-foreground' }),
}
${scriptEnd}

<template>
  <Card label="Workspace" description="Your latest updates" :ui="ui" class="w-full max-w-md">
    <template #action>New</template>
    <p>Three updates are available.</p>
    <template #footer>Updated today</template>
  </Card>
</template>`
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize the attributes of each card region."
    :code="code"
    :show-reset="false"
  >
    <Card label="Workspace" description="Your latest updates" :ui="ui" class="w-full max-w-md">
      <template #action>New</template>
      <p>Three updates are available.</p>
      <template #footer>Updated today</template>
    </Card>
  </ComponentExample>
</template>
