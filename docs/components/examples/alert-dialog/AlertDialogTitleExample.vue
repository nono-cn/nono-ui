<script setup lang="ts">
import { computed, ref } from 'vue'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const label = ref('Delete this project?')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { AlertDialog } from '__DOCS_PACKAGE__/components/ui/AlertDialog'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const label = ref(${JSON.stringify(label.value)})
${scriptEnd}

<template>
  <AlertDialog :label="label" description="This action cannot be undone.">
    <Button label="Delete project" variant="outline" />
  </AlertDialog>
</template>`,
)

function reset() {
  label.value = 'Delete this project?'
}
</script>

<template>
  <ComponentExample
    title="Title"
    description="Edit the title shown in the confirmation dialog."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex w-full max-w-sm">
        <ExampleTextInputControl v-model="label" label="Title" placeholder="Dialog title" />
      </div>
    </template>
    <AlertDialog :label="label" description="This action cannot be undone.">
      <Button label="Delete project" variant="outline" />
    </AlertDialog>
  </ComponentExample>
</template>
