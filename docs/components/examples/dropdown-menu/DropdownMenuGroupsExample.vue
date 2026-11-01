<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '@/components/ui/DropdownMenu'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: DropdownMenuItem[][] = [
  [{ label: 'Profile', icon: 'user' }, { label: 'Settings' }],
  [
    { label: 'Save', icon: 'save' },
    { label: 'Star', icon: 'star' },
  ],
  [{ label: 'Delete', icon: 'trash2', color: 'error' }],
]

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '__DOCS_PACKAGE__/components/ui/DropdownMenu'

const items: DropdownMenuItem[][] = [
  [{ label: 'Profile', icon: 'user' }, { label: 'Settings' }],
  [
    { label: 'Save', icon: 'save' },
    { label: 'Star', icon: 'star' },
  ],
  [{ label: 'Delete', icon: 'trash2', color: 'error' }],
]
${scriptEnd}

<template>
  <DropdownMenu :items="items">
    <Button label="Actions" variant="outline" />
  </DropdownMenu>
</template>`
</script>

<template>
  <ComponentExample
    title="Groups"
    description="Pass an array of arrays to split the items into groups with a separator between them."
    :code="code"
    :show-reset="false"
  >
    <DropdownMenu :items="items">
      <Button label="Actions" variant="outline" />
    </DropdownMenu>
  </ComponentExample>
</template>
