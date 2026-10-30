<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  dropdownMenuDefaults,
  type DropdownMenuItem,
} from '@/components/ui/DropdownMenu'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const modal = ref(dropdownMenuDefaults.modal)
const items: DropdownMenuItem[] = [
  { label: 'Profile' },
  { label: 'Settings' },
  { label: 'Log out' },
]

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '__DOCS_PACKAGE__/components/ui/DropdownMenu'

const modal = ref(${modal.value})
const items: DropdownMenuItem[] = [{ label: 'Profile' }, { label: 'Settings' }, { label: 'Log out' }]
${scriptEnd}

<template>
  <div class="flex items-center gap-4">
    <DropdownMenu :modal="modal" :items="items">
      <Button label="Menu" variant="outline" />
    </DropdownMenu>
  </div>
</template>`,
)

function reset() {
  modal.value = dropdownMenuDefaults.modal
}
</script>

<template>
  <ComponentExample
    title="Modal"
    description="With modal, the rest of the page cannot be used while the menu is open."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="modal" label="Modal" />
    </template>
    <div class="flex items-center gap-4">
      <DropdownMenu :modal="modal" :items="items">
        <Button label="Menu" variant="outline" />
      </DropdownMenu>
    </div>
  </ComponentExample>
</template>
