<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Checkbox,
  checkboxDefaults,
  checkboxSizes,
  type CheckboxSize,
} from '@/components/ui/Checkbox'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<CheckboxSize>(checkboxDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, type CheckboxSize } from '__DOCS_PACKAGE__/components/ui/Checkbox'

const size = ref<CheckboxSize>('${size.value}')
${scriptEnd}

<template>
  <Checkbox :size="size" :value="true" aria-label="Selected" />
</template>`,
)

function reset() {
  size.value = checkboxDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Choose the checkbox’s visual size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="checkboxSizes" />
      </div>
    </template>
    <Checkbox :size="size" :value="true" aria-label="Selected" />
  </ComponentExample>
</template>
