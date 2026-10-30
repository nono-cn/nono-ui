<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { DropdownMenu, type DropdownMenuItem } from '@/components/ui/DropdownMenu'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const disabled = ref(true)
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

const disabled = ref(${disabled.value})
const items: DropdownMenuItem[] = [{ label: 'Profile' }, { label: 'Settings' }, { label: 'Log out' }]
${scriptEnd}

<template>
  <DropdownMenu :disabled="disabled" :items="items">
    <Button label="Menu" variant="outline" />
  </DropdownMenu>
</template>`,
)

function reset() {
  disabled.value = true
}
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Disable the trigger so the menu cannot be opened."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="disabled" label="Disabled" />
    </template>
    <DropdownMenu :disabled="disabled" :items="items">
      <Button label="Menu" variant="outline" />
    </DropdownMenu>
  </ComponentExample>
</template>
