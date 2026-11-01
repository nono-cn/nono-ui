<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '@/components/ui/DropdownMenu'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: DropdownMenuItem[] = [{ label: 'Online' }, { label: 'Away' }, { label: 'Busy' }]
const colors = ['bg-success', 'bg-warning', 'bg-error']
const descriptions = ['Available now', 'Back in 15 min', 'Do not disturb']

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '__DOCS_PACKAGE__/components/ui/DropdownMenu'

const items: DropdownMenuItem[] = [{ label: 'Online' }, { label: 'Away' }, { label: 'Busy' }]
const colors = ['bg-success', 'bg-warning', 'bg-error']
const descriptions = ['Available now', 'Back in 15 min', 'Do not disturb']
${scriptEnd}

<template>
  <DropdownMenu :items="items">
    <Button label="Status" variant="outline" />
    <template #item-leading="{ index }">
      <span class="size-2 rounded-full" :class="colors[index]" />
    </template>
    <template #item-label="{ item }">
      <strong>{{ item.label }}</strong>
    </template>
    <template #item-description="{ index }">
      <em>{{ descriptions[index] }}</em>
    </template>
  </DropdownMenu>
</template>`
</script>

<template>
  <ComponentExample
    title="Item slots"
    description="Replace the leading, the label and the description of every item; the slots receive the item and its index."
    :code="code"
    :show-reset="false"
  >
    <DropdownMenu :items="items">
      <Button label="Status" variant="outline" />
      <template #item-leading="{ index }">
        <span class="size-2 rounded-full" :class="colors[index]" />
      </template>
      <template #item-label="{ item }">
        <strong>{{ item.label }}</strong>
      </template>
      <template #item-description="{ index }">
        <em>{{ descriptions[index] }}</em>
      </template>
    </DropdownMenu>
  </ComponentExample>
</template>
