<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '@/components/ui/DropdownMenu'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const lastAction = ref('None')

const items: DropdownMenuItem[] = [
  { label: 'Save', icon: 'save', onSelect: () => (lastAction.value = 'Save') },
  { label: 'Star', icon: 'star', onSelect: () => (lastAction.value = 'Star') },
  {
    label: 'Keep open',
    icon: 'heart',
    onSelect: (event) => {
      event.preventDefault()
      lastAction.value = 'Keep open'
    },
  },
]

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '__DOCS_PACKAGE__/components/ui/DropdownMenu'

const lastAction = ref('None')

const items: DropdownMenuItem[] = [
  { label: 'Save', icon: 'save', onSelect: () => (lastAction.value = 'Save') },
  { label: 'Star', icon: 'star', onSelect: () => (lastAction.value = 'Star') },
  {
    label: 'Keep open',
    icon: 'heart',
    onSelect: (event) => {
      event.preventDefault()
      lastAction.value = 'Keep open'
    },
  },
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
    title="Select"
    description="Run an action when an item is selected with item.onSelect."
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
