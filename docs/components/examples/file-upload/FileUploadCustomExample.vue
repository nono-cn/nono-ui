<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { FileUpload, type FileUploadUI } from '@/components/ui/FileUpload'
import { Icon } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const files = ref<File[]>([])
const ui: FileUploadUI = {
  dropzone: ({ isDragging }) => ({
    class: isDragging ? 'bg-primary/10' : 'bg-muted/20',
  }),
  media: () => ({ class: 'text-primary' }),
  list: () => ({ class: 'gap-3' }),
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { FileUpload, type FileUploadUI } from '__DOCS_PACKAGE__/components/ui/FileUpload'
import { Icon } from '__DOCS_PACKAGE__/components/ui/Icon'

const files = ref<File[]>([])
const ui: FileUploadUI = {
  dropzone: ({ isDragging }) => ({ class: isDragging ? 'bg-primary/10' : 'bg-muted/20' }),
  media: () => ({ class: 'text-primary' }),
  list: () => ({ class: 'gap-3' }),
}
${scriptEnd}

<template>
  <FileUpload v-model:files="files" label="Attach files" multiple :ui="ui">
    <template #media><Icon name="file" /></template>
    <template #file="{ file, removeFile }">
      <div class="flex items-center justify-between rounded-md border p-3">
        <span>{{ file.name }}</span>
        <Button label="Remove" variant="outline" size="xs" @click="removeFile" />
      </div>
    </template>
  </FileUpload>
</template>`

function reset() {
  files.value = []
}
</script>

<template>
  <ComponentExample
    title="Slots and UI"
    description="Style internal parts and replace the media and file rows."
    :code="code"
    @reset="reset"
  >
    <FileUpload v-model:files="files" label="Attach files" multiple :ui="ui">
      <template #media><Icon name="file" /></template>
      <template #file="{ file, removeFile }">
        <div class="flex items-center justify-between rounded-md border p-3">
          <span>{{ file.name }}</span>
          <Button label="Remove" variant="outline" size="xs" @click="removeFile" />
        </div>
      </template>
    </FileUpload>
  </ComponentExample>
</template>
