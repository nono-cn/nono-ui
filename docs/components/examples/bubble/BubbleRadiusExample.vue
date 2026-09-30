<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bubble } from '@/components/ui/Bubble'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const radius = ref('xl')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Bubble } from '__DOCS_PACKAGE__/components/ui/Bubble'

const radius = ref(${JSON.stringify(radius.value)})
${scriptEnd}

<template>
  <Bubble :radius="radius">A message with a custom radius.</Bubble>
</template>`,
)

function reset() {
  radius.value = 'xl'
}
</script>

<template>
  <ComponentExample
    title="Radius"
    description="Use a Tailwind radius token, a CSS value, or a number of pixels."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleTextInputControl v-model="radius" label="Radius" placeholder="xl, full, 12px…" />
    </template>
    <Bubble :radius="radius">A message with a custom radius.</Bubble>
  </ComponentExample>
</template>
