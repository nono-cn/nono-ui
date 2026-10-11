<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Separator,
  separatorDefaults,
  separatorPositions,
  type SeparatorPosition,
} from '@/components/ui/Separator'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const position = ref<SeparatorPosition>(separatorDefaults.position)
const code = computed(
  () => `<script setup lang="ts">
import { Separator } from '__DOCS_PACKAGE__/components/ui/Separator'
${scriptEnd}

<template>
  <div class="grid w-full max-w-sm gap-4">
    <p>Sign in</p>
    <Separator label="OR" position="${position.value}" />
    <p>Continue as guest</p>
  </div>
</template>`,
)

function reset() {
  position.value = separatorDefaults.position
}
</script>

<template>
  <ComponentExample
    title="Position"
    description="Align the label or default slot content left, center, or right."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="position" label="Position" :options="separatorPositions" />
    </template>
    <div class="grid w-full max-w-sm gap-4">
      <p>Sign in</p>
      <Separator label="OR" :position="position" />
      <p>Continue as guest</p>
    </div>
  </ComponentExample>
</template>
