<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '@/components/ui/DropdownMenu'
import { Kbd } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: DropdownMenuItem[] = [{ label: 'New file' }, { label: 'Save' }, { label: 'Print' }]
const shortcuts = ['Ctrl N', 'Ctrl S', 'Ctrl P']

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '__DOCS_PACKAGE__/components/ui/DropdownMenu'
import { Kbd } from '__DOCS_PACKAGE__/components/ui/Kbd'

const items: DropdownMenuItem[] = [{ label: 'New file' }, { label: 'Save' }, { label: 'Print' }]
const shortcuts = ['Ctrl N', 'Ctrl S', 'Ctrl P']
${scriptEnd}

<template>
  <DropdownMenu :items="items">
    <Button label="File" variant="outline" />
    <template #item="{ item, index }">
      <span class="flex-1">{{ item.label }}</span>
      <Kbd :label="shortcuts[index]" size="sm" />
    </template>
  </DropdownMenu>
</template>`
</script>

<template>
  <ComponentExample
    title="Item slot"
    description="Replace the whole content of every item; the slot receives the item and its index."
    :code="code"
    :show-reset="false"
  >
    <DropdownMenu :items="items">
      <Button label="File" variant="outline" />
      <template #item="{ item, index }">
        <span class="flex-1">{{ item.label }}</span>
        <Kbd :label="shortcuts[index]" size="sm" />
      </template>
    </DropdownMenu>
  </ComponentExample>
</template>
