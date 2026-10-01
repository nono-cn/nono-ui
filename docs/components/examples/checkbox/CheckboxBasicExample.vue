<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(false)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'

const value = ref(${value.value})
${scriptEnd}

<template>
  <label class="flex items-center gap-2">
    <Checkbox v-model:value="value" />
    <span>Receive updates</span>
  </label>
</template>`,
)

function reset() {
  value.value = false
}
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Bind a boolean value to an accessible checkbox."
    :code="code"
    @reset="reset"
  >
    <label class="flex items-center gap-2">
      <Checkbox v-model:value="value" />
      <span>Receive updates</span>
    </label>
  </ComponentExample>
</template>
