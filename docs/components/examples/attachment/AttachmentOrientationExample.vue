<script setup lang="ts">
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Attachment } from '__DOCS_PACKAGE__/components/ui/Attachment'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-start gap-4">
    <Attachment
      label="Horizontal"
      description="2.4 MB"
      orientation="horizontal"
      :icon="{ name: 'file' }"
    />
    <Attachment
      label="Vertical"
      description="2.4 MB"
      orientation="vertical"
      :icon="{ name: 'file' }"
    />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="Choose a horizontal or vertical layout."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-start gap-4">
      <Attachment
        label="Horizontal"
        description="2.4 MB"
        orientation="horizontal"
        :icon="{ name: 'file' }"
      />
      <Attachment
        label="Vertical"
        description="2.4 MB"
        orientation="vertical"
        :icon="{ name: 'file' }"
      />
    </div>
  </ComponentExample>
</template>
