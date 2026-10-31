<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '@/components/ui/DropdownMenu'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: DropdownMenuItem[] = [{ label: 'Online' }, { label: 'Away' }, { label: 'Busy' }]
const colors = ['bg-success', 'bg-warning', 'bg-error']

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '__DOCS_PACKAGE__/components/ui/DropdownMenu'

const items: DropdownMenuItem[] = [{ label: 'Online' }, { label: 'Away' }, { label: 'Busy' }]
const colors = ['bg-success', 'bg-warning', 'bg-error']
${scriptEnd}

<template>
  <DropdownMenu :items="items">
    <Button label="Status" variant="outline" />
    <template #leading="{ index }">
      <span class="size-2 rounded-full" :class="colors[index]" />
    </template>
  </DropdownMenu>
</template>`
</script>

<template>
  <ComponentExample
    title="Leading slot"
    description="Replace the icon of every item; the slot receives the item and its index."
    :code="code"
    :show-reset="false"
  >
    <DropdownMenu :items="items">
      <Button label="Status" variant="outline" />
      <template #leading="{ index }">
        <span class="size-2 rounded-full" :class="colors[index]" />
      </template>
    </DropdownMenu>
  </ComponentExample>
</template>
