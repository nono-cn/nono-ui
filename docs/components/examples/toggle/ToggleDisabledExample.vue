<script setup lang="ts">
import { computed, ref } from 'vue'
import { Toggle } from '@/components/ui/Toggle'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const disabled = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { Toggle } from '__DOCS_PACKAGE__/components/ui/Toggle'
${scriptEnd}

<template>
  <Toggle :disabled="${disabled.value}" label="Bold" aria-label="Toggle bold" />
</template>`,
)

function reset() {
  disabled.value = true
}
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Prevent interaction when unavailable."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="disabled" label="Disabled" />
    </template>
    <Toggle :disabled="disabled" label="Bold" aria-label="Toggle bold" />
  </ComponentExample>
</template>
