<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '@/components/ui/DropdownMenu'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: DropdownMenuItem[] = [
  { label: 'Save', icon: 'save' },
  { label: 'Star', icon: 'star', disabled: true },
  { label: 'Like', icon: 'heart' },
]

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '__DOCS_PACKAGE__/components/ui/DropdownMenu'

const items: DropdownMenuItem[] = [
  { label: 'Save', icon: 'save' },
  { label: 'Star', icon: 'star', disabled: true },
  { label: 'Like', icon: 'heart' },
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
    title="Item disabled"
    description="Disable single items with item.disabled; they cannot be focused or selected."
    :code="code"
    :show-reset="false"
  >
    <DropdownMenu :items="items">
      <Button label="Actions" variant="outline" />
    </DropdownMenu>
  </ComponentExample>
</template>
