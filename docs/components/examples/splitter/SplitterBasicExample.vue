<script setup lang="ts">
import { Splitter } from '@/components/ui/Splitter'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  { id: 'navigation', slot: 'navigation', defaultSize: 24, minSize: 16 },
  { id: 'editor', slot: 'editor', defaultSize: 50, minSize: 32 },
  { id: 'preview', slot: 'preview', defaultSize: 26, minSize: 18 },
]

const code = `<script setup lang="ts">
import { Splitter } from '__DOCS_PACKAGE__/components/ui/Splitter'

const items = [
  { id: 'navigation', slot: 'navigation', defaultSize: 24, minSize: 16 },
  { id: 'editor', slot: 'editor', defaultSize: 50, minSize: 32 },
  { id: 'preview', slot: 'preview', defaultSize: 26, minSize: 18 },
]
${scriptEnd}

<template>
  <Splitter :items="items" class="h-56 w-full overflow-hidden rounded-lg border">
    <template #panel-navigation>
      <div class="flex h-full items-center justify-center bg-muted/30 p-3 text-sm">
        Navigation
      </div>
    </template>
    <template #panel-editor>
      <div class="flex h-full items-center justify-center p-3 text-sm">Editor</div>
    </template>
    <template #panel-preview>
      <div class="flex h-full items-center justify-center bg-muted/30 p-3 text-sm">
        Preview
      </div>
    </template>
  </Splitter>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Resize three panels by dragging the handles or using the keyboard."
    :code="code"
    :show-reset="false"
  >
    <Splitter :items="items" class="h-56 w-full overflow-hidden rounded-lg border">
      <template #panel-navigation>
        <div class="flex h-full items-center justify-center bg-muted/30 p-3 text-sm">
          Navigation
        </div>
      </template>
      <template #panel-editor>
        <div class="flex h-full items-center justify-center p-3 text-sm">Editor</div>
      </template>
      <template #panel-preview>
        <div class="flex h-full items-center justify-center bg-muted/30 p-3 text-sm">Preview</div>
      </template>
    </Splitter>
  </ComponentExample>
</template>
