<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox, checkboxDefaults } from '@/components/ui/Checkbox'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const icons: IconName[] = ['check', 'plus', 'star']
const icon = ref<IconName>(checkboxDefaults.icon)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'
import type { IconName } from '__DOCS_PACKAGE__/components/ui/Icon'

const icon = ref<IconName>('${icon.value}')
${scriptEnd}

<template>
  <div class="flex items-center gap-4">
    <Checkbox :value="true" :icon="icon" aria-label="Selected with chosen icon" />
    <Checkbox
      value="indeterminate"
      indeterminate-icon="minus"
      aria-label="Partial selection with custom icon"
    />
  </div>
</template>`,
)

function reset() {
  icon.value = checkboxDefaults.icon
}
</script>

<template>
  <ComponentExample
    title="Icons"
    description="Choose an icon name for each state."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="icon" label="Checked icon" :options="icons" />
      </div>
    </template>
    <div class="flex items-center gap-4">
      <Checkbox :value="true" :icon="icon" aria-label="Selected with chosen icon" />
      <Checkbox
        value="indeterminate"
        indeterminate-icon="minus"
        aria-label="Partial selection with custom icon"
      />
    </div>
  </ComponentExample>
</template>
