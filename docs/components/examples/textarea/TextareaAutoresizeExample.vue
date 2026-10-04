<script setup lang="ts">
import { computed, ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Textarea, textareaDefaults } from '@/components/ui/Textarea'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const autoresize = ref(true)
const value = ref('')

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Textarea } from '__DOCS_PACKAGE__/components/ui/Textarea'

const value = ref('')
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-2">
    <Label for="growing-text">Message</Label>
    <Textarea id="growing-text" v-model="value" :autoresize="${autoresize.value}" placeholder="Start typing to grow this field..." />
  </div>
</template>`,
)

function reset() {
  autoresize.value = true
  value.value = textareaDefaults.modelValue
}
</script>

<template>
  <ComponentExample
    title="Autoresize"
    description="Let the field grow to fit its content."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="autoresize" label="Autoresize" />
    </template>
    <div class="grid w-full max-w-lg gap-2">
      <Label for="growing-text">Message</Label>
      <Textarea
        id="growing-text"
        v-model="value"
        :autoresize="autoresize"
        placeholder="Start typing to grow this field..."
      />
    </div>
  </ComponentExample>
</template>
