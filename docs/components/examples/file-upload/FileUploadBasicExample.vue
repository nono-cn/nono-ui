<script setup lang="ts">
import { ref } from 'vue'
import { FileUpload } from '@/components/ui/FileUpload'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const files = ref<File[]>([])

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { FileUpload } from '__DOCS_PACKAGE__/components/ui/FileUpload'

const files = ref<File[]>([])
${scriptEnd}

<template>
  <FileUpload
    v-model:files="files"
    label="Upload a file"
    description="Drag a file here or click to browse."
  />
</template>`

function reset() {
  files.value = []
}
</script>

<template>
  <ComponentExample
    title="Basic upload"
    description="Select or drop one file and remove it from the list."
    :code="code"
    @reset="reset"
  >
    <FileUpload
      v-model:files="files"
      label="Upload a file"
      description="Drag a file here or click to browse."
    />
  </ComponentExample>
</template>
