<script setup lang="ts">
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Attachment } from '__DOCS_PACKAGE__/components/ui/Attachment'
<\/script>

<template>
  <div class="flex flex-wrap items-start gap-4">
    <Attachment label="Horizontal" description="2,4 MB" orientation="horizontal" :icon="{ name: 'file' }" />
    <Attachment label="Vertical" description="2,4 MB" orientation="vertical" :icon="{ name: 'file' }" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Orientación"
    description="Elige entre composición horizontal o vertical."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-start gap-4">
      <Attachment
        label="Horizontal"
        description="2,4 MB"
        orientation="horizontal"
        :icon="{ name: 'file' }"
      />
      <Attachment
        label="Vertical"
        description="2,4 MB"
        orientation="vertical"
        :icon="{ name: 'file' }"
      />
    </div>
  </ComponentExample>
</template>
