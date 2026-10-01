<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Attachment,
  attachmentDefaults,
  attachmentStateNames,
  type AttachmentState,
  type AttachmentUI,
} from '@/components/ui/Attachment'
import { Button } from '@/components/ui/Button'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const state = ref<AttachmentState>(attachmentDefaults.state)
const ui: AttachmentUI = {
  media: ({ state }) => ({
    class:
      state === 'error'
        ? 'rounded-full bg-error/10 text-error'
        : 'rounded-full bg-primary/10 text-primary ring-1 ring-primary/20',
  }),
  content: ({ state }) => ({
    class: state === 'done' ? 'rounded-md bg-success/5 p-2' : 'rounded-md bg-muted/40 p-2',
  }),
  label: ({ state }) => ({ class: state === 'error' ? 'text-error' : 'text-primary' }),
  description: () => ({ class: 'font-medium' }),
  actions: ({ state }) => ({
    class: state === 'done' ? 'rounded-md bg-success/10 p-1' : 'rounded-md bg-muted/40 p-1',
  }),
}

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Attachment, type AttachmentState, type AttachmentUI } from '__DOCS_PACKAGE__/components/ui/Attachment'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const state = ref<AttachmentState>('${state.value}')
const ui: AttachmentUI = {
  media: ({ state }) => ({
    class: state === 'error' ? 'rounded-full bg-error/10 text-error' : 'rounded-full bg-primary/10 text-primary ring-1 ring-primary/20',
  }),
  content: ({ state }) => ({
    class: state === 'done' ? 'rounded-md bg-success/5 p-2' : 'rounded-md bg-muted/40 p-2',
  }),
  label: ({ state }) => ({ class: state === 'error' ? 'text-error' : 'text-primary' }),
  description: () => ({ class: 'font-medium' }),
  actions: ({ state }) => ({
    class: state === 'done' ? 'rounded-md bg-success/10 p-1' : 'rounded-md bg-muted/40 p-1',
  }),
}
${scriptEnd}

<template>
  <Attachment label="report.pdf" description="PDF · 2.4 MB" icon="fileText" :state="state" :ui="ui">
    <template #actions="{ state: slotState }">
      <Button
        :label="slotState === 'done' ? 'Uploaded' : 'Download'"
        icon="download"
        size="xs"
        variant="outline"
        :disabled="slotState === 'uploading' || slotState === 'processing'"
      />
    </template>
  </Attachment>
</template>`,
)

function reset() {
  state.value = attachmentDefaults.state
}
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize every container using its AttachmentContext; the actions slot receives the same current state."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="state" label="State" :options="attachmentStateNames" />
      </div>
    </template>
    <Attachment
      label="report.pdf"
      description="PDF · 2.4 MB"
      icon="fileText"
      :state="state"
      :ui="ui"
    >
      <template #actions="{ state: slotState }">
        <Button
          :label="slotState === 'done' ? 'Uploaded' : 'Download'"
          icon="download"
          size="xs"
          variant="outline"
          :disabled="slotState === 'uploading' || slotState === 'processing'"
        />
      </template>
    </Attachment>
  </ComponentExample>
</template>
