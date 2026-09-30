<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Attachment,
  attachmentOrientationNames,
  type AttachmentOrientation,
} from '@/components/ui/Attachment'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const orientation = ref<AttachmentOrientation>('horizontal')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Attachment, type AttachmentOrientation } from '__DOCS_PACKAGE__/components/ui/Attachment'

const orientation = ref<AttachmentOrientation>('${orientation.value}')
${scriptEnd}

<template>
  <Attachment
    label="document.pdf"
    description="PDF · 2.4 MB"
    :orientation="orientation"
    icon="fileText"
  />
</template>`,
)

function reset() {
  orientation.value = 'horizontal'
}
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="Choose a horizontal or vertical layout for the attachment."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="orientation"
          label="Orientation"
          :options="attachmentOrientationNames"
        />
      </div>
    </template>
    <Attachment
      label="document.pdf"
      description="PDF · 2.4 MB"
      :orientation="orientation"
      icon="fileText"
    />
  </ComponentExample>
</template>
