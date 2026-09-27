<script setup lang="ts">
import { computed, ref } from 'vue'
import { Alert } from '@/components/ui/Alert'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const label = ref('Account updated')
const description = ref('Your account details are up to date.')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'

const label = ref(${JSON.stringify(label.value)})
const description = ref(${JSON.stringify(description.value)})
${scriptEnd}

<template>
  <Alert :label="label" :description="description" />
</template>`,
)

function reset() {
  label.value = 'Account updated'
  description.value = 'Your account details are up to date.'
}
</script>

<template>
  <ComponentExample
    title="Description"
    description="Edit both the alert title and its supporting description."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="grid w-full gap-4 sm:grid-cols-2">
        <ExampleTextInputControl v-model="label" label="Title" placeholder="Alert title" />
        <ExampleTextInputControl
          v-model="description"
          label="Description"
          placeholder="Alert description"
        />
      </div>
    </template>
    <div class="w-full max-w-2xl">
      <Alert :label="label" :description="description" />
    </div>
  </ComponentExample>
</template>
