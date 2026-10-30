<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '@/components/ui/DropdownMenu'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: DropdownMenuItem[] = [
  { label: 'Profile' },
  { label: 'Settings' },
  { label: 'Log out' },
]

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '__DOCS_PACKAGE__/components/ui/DropdownMenu'

const items: DropdownMenuItem[] = [{ label: 'Profile' }, { label: 'Settings' }, { label: 'Log out' }]
${scriptEnd}

<template>
  <DropdownMenu :items="items">
    <Button label="Open menu" variant="outline" />
  </DropdownMenu>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Click the button to open the menu."
    :code="code"
    :show-reset="false"
  >
    <DropdownMenu :items="items">
      <Button label="Open menu" variant="outline" />
    </DropdownMenu>
  </ComponentExample>
</template>
