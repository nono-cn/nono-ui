<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  dropdownMenuDefaults,
  type DropdownMenuItem,
} from '@/components/ui/DropdownMenu'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ExampleNumberControl from '../../controls/ExampleNumberControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const showArrow = ref(true)
const width = ref(dropdownMenuDefaults.arrow.width)
const height = ref(dropdownMenuDefaults.arrow.height)
const rounded = ref(dropdownMenuDefaults.arrow.rounded)
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
    :show-arrow="${showArrow.value}"
    :arrow="{ width: ${width.value}, height: ${height.value}, rounded: ${rounded.value} }"
    :items="items"
  >
    <Button label="Menu" variant="outline" />
  </DropdownMenu>
</template>`,
)

function reset() {
  showArrow.value = true
  width.value = dropdownMenuDefaults.arrow.width
  height.value = dropdownMenuDefaults.arrow.height
  rounded.value = dropdownMenuDefaults.arrow.rounded
}
</script>

<template>
  <ComponentExample
    title="Arrow"
    description="Show an arrow pointing to the trigger and change its size and shape."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleCheckboxControl v-model="showArrow" label="Show arrow" />
        <ExampleNumberControl v-model="width" label="Width" :min="0" />
        <ExampleNumberControl v-model="height" label="Height" :min="0" />
        <ExampleCheckboxControl v-model="rounded" label="Rounded" />
      </div>
    </template>
    <DropdownMenu :show-arrow="showArrow" :arrow="{ width, height, rounded }" :items="items">
      <Button label="Menu" variant="outline" />
    </DropdownMenu>
  </ComponentExample>
</template>
