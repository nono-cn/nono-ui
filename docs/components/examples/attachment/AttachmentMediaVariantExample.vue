<script setup lang="ts">
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Attachment } from '__DOCS_PACKAGE__/components/ui/Attachment'
${scriptEnd}

<template>
  <div class="grid gap-3 sm:grid-cols-2">
    <Attachment label="document.pdf" description="Icon media" :icon="{ name: 'fileText' }" />
    <Attachment label="landscape.jpg" description="Image media" media-variant="image">
      <template #media>
        <div
          class="size-full bg-gradient-to-br from-sky-400 to-indigo-600"
          role="img"
          aria-label="Landscape preview"
        />
      </template>
    </Attachment>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Media variant"
    description="Compare the icon and image media variants."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-3 sm:grid-cols-2">
      <Attachment label="document.pdf" description="Icon media" :icon="{ name: 'fileText' }" />
      <Attachment label="landscape.jpg" description="Image media" media-variant="image">
        <template #media>
          <div
            class="size-full bg-gradient-to-br from-sky-400 to-indigo-600"
            role="img"
            aria-label="Landscape preview"
          />
        </template>
      </Attachment>
    </div>
  </ComponentExample>
</template>
