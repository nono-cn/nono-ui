<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '@/components/ui/DropdownMenu'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const lastAction = ref('None')

const items: DropdownMenuItem[] = [
  { label: 'Copy', onSelect: () => (lastAction.value = 'Copy') },
  { label: 'Profile', icon: 'user', onSelect: () => (lastAction.value = 'Profile') },
  {
    label: 'Favorites',
    description: 'Items you starred',
    onSelect: () => (lastAction.value = 'Favorites'),
  },
  {
    label: 'Save',
    description: 'Store the current changes',
    icon: 'save',
    onSelect: () => (lastAction.value = 'Save'),
  },
  {
    label: 'Keep open',
    description: 'The menu stays open',
    icon: 'heart',
    onSelect: (event) => {
      event.preventDefault()
      lastAction.value = 'Keep open'
    },
  },
  { label: 'Delete', description: 'Remove this project', icon: 'trash2', disabled: true },
]

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '__DOCS_PACKAGE__/components/ui/DropdownMenu'

const lastAction = ref('None')

const items: DropdownMenuItem[] = [
  { label: 'Copy', onSelect: () => (lastAction.value = 'Copy') },
  { label: 'Profile', icon: 'user', onSelect: () => (lastAction.value = 'Profile') },
  {
    label: 'Favorites',
    description: 'Items you starred',
    onSelect: () => (lastAction.value = 'Favorites'),
  },
  {
    label: 'Save',
    description: 'Store the current changes',
    icon: 'save',
    onSelect: () => (lastAction.value = 'Save'),
  },
  {
    label: 'Keep open',
    description: 'The menu stays open',
    icon: 'heart',
    onSelect: (event) => {
      event.preventDefault()
      lastAction.value = 'Keep open'
    },
  },
  { label: 'Delete', description: 'Remove this project', icon: 'trash2', disabled: true },
]
${scriptEnd}

<template>
  <div class="flex items-center gap-4">
    <DropdownMenu :items="items">
      <Button label="Actions" variant="outline" />
    </DropdownMenu>
    <span class="text-sm text-muted-foreground">Last action: {{ lastAction }}</span>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Items"
    description="Combine label, description, icon, disabled and onSelect in each item; call event.preventDefault() in onSelect to keep the menu open."
    :code="code"
    :show-reset="false"
  >
    <div class="flex items-center gap-4">
      <DropdownMenu :items="items">
        <Button label="Actions" variant="outline" />
      </DropdownMenu>
      <span class="text-sm text-muted-foreground">Last action: {{ lastAction }}</span>
    </div>
  </ComponentExample>
</template>
