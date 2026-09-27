<script setup lang="ts">
import { computed, ref } from 'vue'
import { Attachment } from '@/components/ui/Attachment'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const label = ref('document.pdf')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Attachment } from '__DOCS_PACKAGE__/components/ui/Attachment'

const label = ref(${JSON.stringify(label.value)})
${scriptEnd}

<template>
  <Attachment :label="label" description="PDF · 2.4 MB" :icon="{ name: 'fileText' }" />
</template>`,
)

function reset() {
  label.value = 'document.pdf'
}
</script>

<template>
  <ComponentExample
    title="Title"
    description="Customize the file name or title displayed in the attachment."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex w-full max-w-sm">
        <ExampleTextInputControl v-model="label" label="Title" placeholder="File name" />
      </div>
    </template>
    <Attachment :label="label" description="PDF · 2.4 MB" :icon="{ name: 'fileText' }" />
  </ComponentExample>
</template>
