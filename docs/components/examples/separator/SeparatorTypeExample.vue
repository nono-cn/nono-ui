<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Separator,
  separatorDefaults,
  separatorTypes,
  type SeparatorType,
} from '@/components/ui/Separator'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const type = ref<SeparatorType>(separatorDefaults.type)
const code = computed(
  () => `<script setup lang="ts">
import { Separator } from '__DOCS_PACKAGE__/components/ui/Separator'
${scriptEnd}

<template>
  <div class="grid w-full max-w-sm gap-4">
    <p>Account details</p>
    <Separator type="${type.value}" />
    <p>Preferences</p>
  </div>
</template>`,
)

function reset() {
  type.value = separatorDefaults.type
}
</script>

<template>
  <ComponentExample
    title="Type"
    description="Choose a solid, dashed, or dotted line."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="type" label="Type" :options="separatorTypes" />
    </template>
    <div class="grid w-full max-w-sm gap-4">
      <p>Account details</p>
      <Separator :type="type" />
      <p>Preferences</p>
    </div>
  </ComponentExample>
</template>
