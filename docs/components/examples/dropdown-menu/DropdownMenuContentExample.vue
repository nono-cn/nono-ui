<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  dropdownMenuDefaults,
  type DropdownMenuContentConfig,
  type DropdownMenuItem,
} from '@/components/ui/DropdownMenu'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ExampleNumberControl from '../../controls/ExampleNumberControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const side = ref<NonNullable<DropdownMenuContentConfig['side']>>(dropdownMenuDefaults.content.side)
const align = ref<NonNullable<DropdownMenuContentConfig['align']>>(
  dropdownMenuDefaults.content.align,
)
const sideOffset = ref(dropdownMenuDefaults.content.sideOffset)
const loop = ref(dropdownMenuDefaults.content.loop)
const items: DropdownMenuItem[] = [
  { label: 'Profile' },
  { label: 'Settings' },
  { label: 'Log out' },
]

const code = computed(
  () => `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '__DOCS_PACKAGE__/components/ui/DropdownMenu'

const items: DropdownMenuItem[] = [{ label: 'Profile' }, { label: 'Settings' }, { label: 'Log out' }]
${scriptEnd}

<template>
  <DropdownMenu
    :content="{ side: '${side.value}', align: '${align.value}', sideOffset: ${sideOffset.value}, loop: ${loop.value} }"
    :items="items"
  >
    <Button label="Menu" variant="outline" />
  </DropdownMenu>
</template>`,
)

function reset() {
  side.value = dropdownMenuDefaults.content.side
  align.value = dropdownMenuDefaults.content.align
  sideOffset.value = dropdownMenuDefaults.content.sideOffset
  loop.value = dropdownMenuDefaults.content.loop
}
</script>

<template>
  <ComponentExample
    title="Content"
    description="Choose the side, alignment and offset of the menu, and whether keyboard navigation loops."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="side"
          label="Side"
          :options="['top', 'right', 'bottom', 'left']"
        />
        <ExampleSelectControl v-model="align" label="Align" :options="['start', 'center', 'end']" />
        <ExampleNumberControl v-model="sideOffset" label="Side offset" :min="0" />
        <ExampleCheckboxControl v-model="loop" label="Loop" />
      </div>
    </template>
    <DropdownMenu :content="{ side, align, sideOffset, loop }" :items="items">
      <Button label="Menu" variant="outline" />
    </DropdownMenu>
  </ComponentExample>
</template>
