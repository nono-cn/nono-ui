<script setup lang="ts">
import { computed, ref } from 'vue'
import { Alert } from '@/components/ui/Alert'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const label = ref('Account updated')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'

const label = ref(${JSON.stringify(label.value)})
${scriptEnd}

<template>
  <Alert :label="label" description="Your account details are up to date." />
</template>`,
)

function reset() {
  label.value = 'Account updated'
}
</script>

<template>
  <ComponentExample
    title="Title"
    description="Edit the title displayed in the alert."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex w-full max-w-sm">
        <ExampleTextInputControl v-model="label" label="Title" placeholder="Alert title" />
      </div>
    </template>
    <div class="w-full max-w-2xl">
      <Alert :label="label" description="Your account details are up to date." />
    </div>
  </ComponentExample>
</template>
