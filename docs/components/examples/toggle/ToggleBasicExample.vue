<script setup lang="ts">
import { computed, ref } from 'vue'
import { Toggle } from '@/components/ui/Toggle'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const pressed = ref(false)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Toggle } from '__DOCS_PACKAGE__/components/ui/Toggle'

const pressed = ref(${pressed.value})
${scriptEnd}

<template>
  <Toggle v-model="pressed" label="Bold" aria-label="Toggle bold" />
</template>`,
)

function reset() {
  pressed.value = false
}
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Toggle a pressed state."
    :code="code"
    @reset="reset"
  >
    <Toggle v-model="pressed" label="Bold" aria-label="Toggle bold" />
  </ComponentExample>
</template>
