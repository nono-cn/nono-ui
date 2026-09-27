<script setup lang="ts">
import { computed, ref } from 'vue'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const label = ref('Delete this project?')
const description = ref(
  'This action cannot be undone. The project and its data will be permanently removed.',
)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { AlertDialog } from '__DOCS_PACKAGE__/components/ui/AlertDialog'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const label = ref(${JSON.stringify(label.value)})
const description = ref(${JSON.stringify(description.value)})
${scriptEnd}

<template>
  <AlertDialog :label="label" :description="description">
    <Button label="Delete project" variant="outline" />
  </AlertDialog>
</template>`,
)

function reset() {
  label.value = 'Delete this project?'
  description.value =
    'This action cannot be undone. The project and its data will be permanently removed.'
}
</script>

<template>
  <ComponentExample
    title="Description"
    description="Edit the title and supporting description shown in the dialog."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="grid w-full gap-4 sm:grid-cols-2">
        <ExampleTextInputControl v-model="label" label="Title" placeholder="Dialog title" />
        <ExampleTextInputControl
          v-model="description"
          label="Description"
          placeholder="Dialog description"
        />
      </div>
    </template>
    <AlertDialog :label="label" :description="description">
      <Button label="Delete project" variant="outline" />
    </AlertDialog>
  </ComponentExample>
</template>
