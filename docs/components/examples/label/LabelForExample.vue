<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox } from '@/components/ui/Checkbox'
import { Label } from '@/components/ui/Label'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const controlId = ref('updates')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'

const controlId = ref(${JSON.stringify(controlId.value)})
${scriptEnd}

<template>
  <div class="flex items-center gap-2">
    <Checkbox :id="controlId" />
    <Label :for="controlId">Receive updates</Label>
  </div>
</template>`,
)

function reset() {
  controlId.value = 'updates'
}
</script>

<template>
  <ComponentExample
    title="For"
    description="Use the control’s id as the for value to preserve the accessible association."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex w-full max-w-sm">
        <ExampleTextInputControl v-model="controlId" label="Control ID" placeholder="updates" />
      </div>
    </template>
    <div class="flex items-center gap-2">
      <Checkbox :id="controlId" />
      <Label :for="controlId">Receive updates</Label>
    </div>
  </ComponentExample>
</template>
