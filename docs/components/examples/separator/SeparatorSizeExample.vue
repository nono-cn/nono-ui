<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Separator,
  separatorDefaults,
  separatorSizes,
  type SeparatorSize,
} from '@/components/ui/Separator'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<SeparatorSize>(separatorDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { Separator } from '__DOCS_PACKAGE__/components/ui/Separator'
${scriptEnd}

<template>
  <div class="grid w-full max-w-sm gap-4">
    <p>Account details</p>
    <Separator size="${size.value}" />
    <p>Preferences</p>
  </div>
</template>`,
)

function reset() {
  size.value = separatorDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Adjust the separator thickness."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="size" label="Size" :options="separatorSizes" />
    </template>
    <div class="grid w-full max-w-sm gap-4">
      <p>Account details</p>
      <Separator :size="size" />
      <p>Preferences</p>
    </div>
  </ComponentExample>
</template>
