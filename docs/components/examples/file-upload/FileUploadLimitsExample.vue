<script setup lang="ts">
import { computed, ref } from 'vue'
import { FileUpload } from '@/components/ui/FileUpload'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const files = ref<File[]>([])
const multiple = ref(true)
const disabled = ref(false)
const showList = ref(true)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { FileUpload } from '__DOCS_PACKAGE__/components/ui/FileUpload'

const files = ref<File[]>([])
const multiple = ref(${multiple.value})
const disabled = ref(${disabled.value})
const showList = ref(${showList.value})
${scriptEnd}

<template>
  <FileUpload
    v-model:files="files"
    label="Project files"
    description="Up to three files and 2 MB total."
    accept=".pdf,image/*"
    :multiple="multiple"
    :disabled="disabled"
    :show-list="showList"
    :max-files="3"
    :max-size="2097152"
  />
</template>`,
)

function reset() {
  files.value = []
  multiple.value = true
  disabled.value = false
  showList.value = true
}
</script>

<template>
  <ComponentExample
    title="Selection and limits"
    description="Control multiple selection, disabled state, the file list, count, and total size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleCheckboxControl v-model="multiple" label="Multiple" />
        <ExampleCheckboxControl v-model="disabled" label="Disabled" />
        <ExampleCheckboxControl v-model="showList" label="Show list" />
      </div>
    </template>
    <FileUpload
      v-model:files="files"
      label="Project files"
      description="Up to three files and 2 MB total."
      accept=".pdf,image/*"
      :multiple="multiple"
      :disabled="disabled"
      :show-list="showList"
      :max-files="3"
      :max-size="2097152"
    />
  </ComponentExample>
</template>
