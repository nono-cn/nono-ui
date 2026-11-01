<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '@/components/ui/DropdownMenu'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: DropdownMenuItem[] = [
  { label: 'Save', textValue: 'Save' },
  { label: 'Star', textValue: 'Star' },
  { label: 'Like', textValue: 'Like' },
]

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '__DOCS_PACKAGE__/components/ui/DropdownMenu'

const items: DropdownMenuItem[] = [
  { label: 'Save', textValue: 'Save' },
  { label: 'Star', textValue: 'Star' },
  { label: 'Like', textValue: 'Like' },
]
${scriptEnd}

<template>
  <DropdownMenu :items="items">
    <Button label="Actions" variant="outline" />
    <template #item-label="{ item, index }">
      <span class="text-muted-foreground">{{ index + 1 }}.</span> {{ item.label }}
    </template>
  </DropdownMenu>
</template>`
</script>

<template>
  <ComponentExample
    title="Text value"
    description="Set item.textValue so typeahead matches the item when its slot does not start with the label."
    :code="code"
    :show-reset="false"
  >
    <DropdownMenu :items="items">
      <Button label="Actions" variant="outline" />
      <template #item-label="{ item, index }">
        <span class="text-muted-foreground">{{ index + 1 }}.</span> {{ item.label }}
      </template>
    </DropdownMenu>
  </ComponentExample>
</template>
