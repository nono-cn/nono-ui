<script setup lang="ts">
import { computed, ref } from 'vue'
import { Attachment } from '@/components/ui/Attachment'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const label = ref('document.pdf')
const description = ref('PDF · 2.4 MB')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Attachment } from '__DOCS_PACKAGE__/components/ui/Attachment'

const label = ref(${JSON.stringify(label.value)})
const description = ref(${JSON.stringify(description.value)})
${scriptEnd}

<template>
  <Attachment :label="label" :description="description" icon="fileText" />
</template>`,
)

function reset() {
  label.value = 'document.pdf'
  description.value = 'PDF · 2.4 MB'
}
</script>

<template>
  <ComponentExample
    title="Description"
    description="Edit the attachment title and its supporting details."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="grid w-full gap-4 sm:grid-cols-2">
        <ExampleTextInputControl v-model="label" label="Title" placeholder="File name" />
        <ExampleTextInputControl
          v-model="description"
          label="Description"
          placeholder="File details"
        />
      </div>
    </template>
    <Attachment :label="label" :description="description" icon="fileText" />
  </ComponentExample>
</template>
