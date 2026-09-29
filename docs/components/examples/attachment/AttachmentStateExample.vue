<script setup lang="ts">
import { computed, ref } from 'vue'
import { Attachment, type AttachmentState } from '@/components/ui/Attachment'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const stateOptions: AttachmentState[] = ['idle', 'uploading', 'processing', 'error', 'done']
const state = ref<AttachmentState>('idle')
const descriptions: Record<AttachmentState, string> = {
  idle: 'Ready to upload · PDF · 2.4 MB',
  uploading: 'Uploading file · PDF · 2.4 MB',
  processing: 'Preparing file · PDF · 2.4 MB',
  error: 'Could not process the file',
  done: 'Upload complete · PDF · 2.4 MB',
}
const description = computed(() => descriptions[state.value])
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Attachment, type AttachmentState } from '__DOCS_PACKAGE__/components/ui/Attachment'

const state = ref<AttachmentState>('${state.value}')
const description = ref(${JSON.stringify(description.value)})
${scriptEnd}

<template>
  <Attachment
    label="document.pdf"
    :description="description"
    :state="state"
    icon="fileText"
  />
</template>`,
)

function reset() {
  state.value = 'idle'
}
</script>

<template>
  <ComponentExample
    title="State"
    description="Choose the visual state shown for the file."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="state" label="State" :options="stateOptions" />
      </div>
    </template>
    <Attachment label="document.pdf" :description="description" :state="state" icon="fileText" />
  </ComponentExample>
</template>
