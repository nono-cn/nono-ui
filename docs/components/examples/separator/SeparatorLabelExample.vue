<script setup lang="ts">
import { computed, ref } from 'vue'
import { Separator } from '@/components/ui/Separator'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const label = ref('OR')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Separator } from '__DOCS_PACKAGE__/components/ui/Separator'

const label = ref(${JSON.stringify(label.value)})
${scriptEnd}

<template>
  <div class="grid w-full max-w-sm gap-4">
    <p>Sign in</p>
    <Separator :label="label" />
    <p>Continue as guest</p>
  </div>
</template>`,
)

function reset() {
  label.value = 'OR'
}
</script>

<template>
  <ComponentExample
    title="Label"
    description="Place a label over the separator line. The default slot replaces it."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex w-full max-w-sm">
        <ExampleTextInputControl v-model="label" label="Label" placeholder="Separator label" />
      </div>
    </template>
    <div class="grid w-full max-w-sm gap-4">
      <p>Sign in</p>
      <Separator :label="label" />
      <p>Continue as guest</p>
    </div>
  </ComponentExample>
</template>
