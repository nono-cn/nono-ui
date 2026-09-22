<script setup lang="ts">
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Attachment } from '__DOCS_PACKAGE__/components/ui/Attachment'
<\/script>

<template>
  <div class="grid gap-3 sm:grid-cols-2">
    <Attachment label="documento.pdf" description="Media icon" :icon="{ name: 'fileText' }" />
    <Attachment label="paisaje.jpg" description="Media image" media-variant="image">
      <template #media>
        <div class="size-full bg-gradient-to-br from-sky-400 to-indigo-600" role="img" aria-label="Vista previa del paisaje" />
      </template>
    </Attachment>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Media variant"
    description="Compara los tipos de media icon e image."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-3 sm:grid-cols-2">
      <Attachment label="documento.pdf" description="Media icon" :icon="{ name: 'fileText' }" />
      <Attachment label="paisaje.jpg" description="Media image" media-variant="image">
        <template #media>
          <div
            class="size-full bg-gradient-to-br from-sky-400 to-indigo-600"
            role="img"
            aria-label="Vista previa del paisaje"
          />
        </template>
      </Attachment>
    </div>
  </ComponentExample>
</template>
