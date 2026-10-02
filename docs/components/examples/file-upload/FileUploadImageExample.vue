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
    label="Add photos"
    description="Choose images to preview them below."
    accept="image/*"
    multiple
    attachment-media-variant="image"
  />
</template>`

function reset() {
  files.value = []
}
</script>

<template>
  <ComponentExample
    title="Image previews"
    description="Show image thumbnails in a grid; other file types use an icon."
    :code="code"
    @reset="reset"
  >
    <FileUpload
      v-model:files="files"
      label="Add photos"
      description="Choose images to preview them below."
      accept="image/*"
      multiple
      attachment-media-variant="image"
    />
  </ComponentExample>
</template>
