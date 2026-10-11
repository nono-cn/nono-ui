<script setup lang="ts">
import { computed, ref } from 'vue'
import { Separator } from '@/components/ui/Separator'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const decorative = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { Separator } from '__DOCS_PACKAGE__/components/ui/Separator'
${scriptEnd}

<template>
  <div class="grid w-full max-w-sm gap-4">
    <p>Account details</p>
    <Separator :decorative="${decorative.value}" />
    <p>Preferences</p>
  </div>
</template>`,
)

function reset() {
  decorative.value = true
}
</script>

<template>
  <ComponentExample
    title="Decorative"
    description="Expose a meaningful divider to assistive technology when decorative is false."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="decorative" label="Decorative" />
    </template>
    <div class="grid w-full max-w-sm gap-4">
      <p>Account details</p>
      <Separator :decorative="decorative" />
      <p>Preferences</p>
    </div>
  </ComponentExample>
</template>
