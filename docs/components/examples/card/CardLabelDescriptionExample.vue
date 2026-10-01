<script setup lang="ts">
import { computed, ref } from 'vue'
import { Card } from '@/components/ui/Card'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialLabel = 'Account overview'
const initialDescription = 'Your account is up to date.'
const label = ref(initialLabel)
const description = ref(initialDescription)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Card } from '__DOCS_PACKAGE__/components/ui/Card'

const label = ref(${JSON.stringify(label.value)})
const description = ref(${JSON.stringify(description.value)})
${scriptEnd}

<template>
  <Card :label="label" :description="description" class="w-full max-w-md">
    <p>View your latest account activity here.</p>
  </Card>
</template>`,
)

function reset() {
  label.value = initialLabel
  description.value = initialDescription
}
</script>

<template>
  <ComponentExample
    title="Label and description"
    description="Edit the generated heading and supporting text."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="grid w-full max-w-lg gap-4">
        <ExampleTextInputControl v-model="label" label="Label" />
        <ExampleTextInputControl v-model="description" label="Description" />
      </div>
    </template>
    <Card :label="label" :description="description" class="w-full max-w-md">
      <p>View your latest account activity here.</p>
    </Card>
  </ComponentExample>
</template>
