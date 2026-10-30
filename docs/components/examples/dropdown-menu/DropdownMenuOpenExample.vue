<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '@/components/ui/DropdownMenu'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const open = ref(false)
const items: DropdownMenuItem[] = [
  { label: 'Profile' },
  { label: 'Settings' },
  { label: 'Log out' },
]

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '__DOCS_PACKAGE__/components/ui/DropdownMenu'

const open = ref(false)
const items: DropdownMenuItem[] = [{ label: 'Profile' }, { label: 'Settings' }, { label: 'Log out' }]
${scriptEnd}

<template>
  <div class="flex items-center gap-4">
    <DropdownMenu v-model:open="open" :items="items">
      <Button label="Menu" variant="outline" />
    </DropdownMenu>
    <span class="text-sm text-muted-foreground">open: {{ open }}</span>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Open"
    description="Bind v-model:open to read or set whether the menu is open."
    :code="code"
    :show-reset="false"
  >
    <div class="flex items-center gap-4">
      <DropdownMenu v-model:open="open" :items="items">
        <Button label="Menu" variant="outline" />
      </DropdownMenu>
      <span class="text-sm text-muted-foreground">open: {{ open }}</span>
    </div>
  </ComponentExample>
</template>
