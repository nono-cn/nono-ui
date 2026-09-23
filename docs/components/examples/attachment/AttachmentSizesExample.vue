<script setup lang="ts">
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const sizes = ['md', 'sm', 'xs'] as const
const code = `<script setup lang="ts">
import { Attachment } from '__DOCS_PACKAGE__/components/ui/Attachment'

const sizes = ['md', 'sm', 'xs'] as const
${scriptEnd}

<template>
  <div class="grid gap-3">
    <Attachment
      v-for="size in sizes"
      :key="size"
      :size="size"
      :label="'File ' + size"
      description="PDF · 2.4 MB"
      :icon="{ name: 'fileText' }"
    />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Size"
    description="Compare the available sizes."
    :code="code"
    :show-reset="false"
  >
    <div class="grid gap-3">
      <Attachment
        v-for="size in sizes"
        :key="size"
        :size="size"
        :label="`File ${size}`"
        description="PDF · 2.4 MB"
        :icon="{ name: 'fileText' }"
      />
    </div>
  </ComponentExample>
</template>
