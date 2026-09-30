<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const classes = ref('rounded-full shadow-lg')
const code = computed(
  () => `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <Button label="Save changes" class="${classes.value}" />
</template>`,
)

function reset() {
  classes.value = 'rounded-full shadow-lg'
}
</script>

<template>
  <ComponentExample
    title="Class"
    description="Customize the button with Tailwind classes."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleTextInputControl v-model="classes" label="Class" />
    </template>
    <Button label="Save changes" :class="classes" />
  </ComponentExample>
</template>
