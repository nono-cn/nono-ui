<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress } from '@/components/ui/Progress'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const label = ref('65%')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'

const label = ref(${JSON.stringify(label.value)})
${scriptEnd}

<template>
  <Progress :model-value="65" size="2xl" :label="label" aria-label="Upload progress" />
</template>`,
)

function reset() {
  label.value = '65%'
}
</script>

<template>
  <ComponentExample
    title="Label"
    description="Show text inside the track."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleTextInputControl v-model="label" label="Label" />
    </template>
    <div class="w-full max-w-md">
      <Progress :model-value="65" size="2xl" :label="label" aria-label="Upload progress" />
    </div>
  </ComponentExample>
</template>
