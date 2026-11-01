<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '@/components/ui/DropdownMenu'
import { Kbd } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const statusItems: DropdownMenuItem[] = [{ label: 'Online' }, { label: 'Away' }, { label: 'Busy' }]
const colors = ['bg-success', 'bg-warning', 'bg-error']
const descriptions = ['Available now', 'Back in 15 min', 'Do not disturb']

// el slot empieza por un emoji, así que textValue indica el texto del typeahead
const fileItems: DropdownMenuItem[] = [
  { label: 'New file', textValue: 'New file' },
  { label: 'Save', textValue: 'Save' },
  { label: 'Print', textValue: 'Print' },
]
const emojis = ['📄', '💾', '🖨️']
const shortcuts = ['Ctrl N', 'Ctrl S', 'Ctrl P']

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '__DOCS_PACKAGE__/components/ui/DropdownMenu'
import { Kbd } from '__DOCS_PACKAGE__/components/ui/Kbd'

const statusItems: DropdownMenuItem[] = [{ label: 'Online' }, { label: 'Away' }, { label: 'Busy' }]
const colors = ['bg-success', 'bg-warning', 'bg-error']
const descriptions = ['Available now', 'Back in 15 min', 'Do not disturb']

// the slot starts with an emoji, so textValue sets the typeahead text
const fileItems: DropdownMenuItem[] = [
  { label: 'New file', textValue: 'New file' },
  { label: 'Save', textValue: 'Save' },
  { label: 'Print', textValue: 'Print' },
]
const emojis = ['📄', '💾', '🖨️']
const shortcuts = ['Ctrl N', 'Ctrl S', 'Ctrl P']
${scriptEnd}

<template>
  <div class="flex items-center gap-4">
    <DropdownMenu :items="statusItems">
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

    <DropdownMenu :items="fileItems">
      <Button label="File" variant="outline" />
      <template #item="{ item, index }">
        <span>{{ emojis[index] }}</span>
        <span class="flex-1">{{ item.label }}</span>
        <Kbd :label="shortcuts[index]" size="sm" />
      </template>
    </DropdownMenu>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Item slots"
    description="Replace the leading, the label and the description of every item, or its whole content with the item slot; the slots receive the item and its index. When the slot does not start with the label, set item.textValue for typeahead."
    :code="code"
    :show-reset="false"
  >
    <div class="flex items-center gap-4">
      <DropdownMenu :items="statusItems">
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

      <DropdownMenu :items="fileItems">
        <Button label="File" variant="outline" />
        <template #item="{ item, index }">
          <span>{{ emojis[index] }}</span>
          <span class="flex-1">{{ item.label }}</span>
          <Kbd :label="shortcuts[index]" size="sm" />
        </template>
      </DropdownMenu>
    </div>
  </ComponentExample>
</template>
