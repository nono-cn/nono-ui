<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  dropdownMenuDefaults,
  dropdownMenuSizes,
  type DropdownMenuItem,
  type DropdownMenuSize,
} from '@/components/ui/DropdownMenu'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<DropdownMenuSize>(dropdownMenuDefaults.size)
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
  <DropdownMenu size="${size.value}" :items="items">
    <Button label="Menu" variant="outline" />
  </DropdownMenu>
</template>`,
)

function reset() {
  size.value = dropdownMenuDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Change the padding and text size of the items."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="size" label="Size" :options="dropdownMenuSizes" />
    </template>
    <DropdownMenu :size="size" :items="items">
      <Button label="Menu" variant="outline" />
    </DropdownMenu>
  </ComponentExample>
</template>
