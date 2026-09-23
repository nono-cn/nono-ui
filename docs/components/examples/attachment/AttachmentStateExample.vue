<script setup lang="ts">
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const states = [
  { value: 'idle', label: 'Idle', description: 'Ready to start' },
  { value: 'uploading', label: 'Uploading', description: 'Uploading file' },
  { value: 'processing', label: 'Processing', description: 'Preparing file' },
  { value: 'error', label: 'Error', description: 'Could not process the file' },
  { value: 'done', label: 'Complete', description: 'File ready' },
] as const

const code = `<script setup lang="ts">
import { Attachment } from '__DOCS_PACKAGE__/components/ui/Attachment'

const states = [
  { value: 'idle', label: 'Idle', description: 'Ready to start' },
  { value: 'uploading', label: 'Uploading', description: 'Uploading file' },
  { value: 'processing', label: 'Processing', description: 'Preparing file' },
  { value: 'error', label: 'Error', description: 'Could not process the file' },
  { value: 'done', label: 'Complete', description: 'File ready' },
] as const
${scriptEnd}

<template>
  <div class="grid gap-3">
    <Attachment
      v-for="state in states"
      :key="state.value"
      :state="state.value"
      :label="state.label"
      :description="state.description"
      :icon="{ name: 'file' }"
    />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="States"
    description="Each state changes the file's visual presentation."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-3">
      <Attachment
        v-for="state in states"
        :key="state.value"
        :state="state.value"
        :label="state.label"
        :description="state.description"
        :icon="{ name: 'file' }"
      />
    </div>
  </ComponentExample>
</template>
