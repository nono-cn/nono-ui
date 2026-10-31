<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '@/components/ui/DropdownMenu'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: DropdownMenuItem[] = [
  { label: 'Profile', icon: 'user' },
  { label: 'Favorites', icon: 'star' },
  { label: 'Delete', icon: 'trash2' },
]

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '__DOCS_PACKAGE__/components/ui/DropdownMenu'

const items: DropdownMenuItem[] = [
  { label: 'Profile', icon: 'user' },
  { label: 'Favorites', icon: 'star' },
  { label: 'Delete', icon: 'trash2' },
]
${scriptEnd}

<template>
  <DropdownMenu :items="items">
    <Button label="Menu" variant="outline" />
  </DropdownMenu>
</template>`
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Show an icon before the label of each item."
    :code="code"
    :show-reset="false"
  >
    <DropdownMenu :items="items">
      <Button label="Menu" variant="outline" />
    </DropdownMenu>
  </ComponentExample>
</template>
