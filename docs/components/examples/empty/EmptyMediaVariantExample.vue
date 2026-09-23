<script setup lang="ts">
import { Empty } from '@/components/ui/Empty'
import { Icon } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Empty } from '__DOCS_PACKAGE__/components/ui/Empty'
import { Icon } from '__DOCS_PACKAGE__/components/ui/Icon'
${scriptEnd}

<template>
  <Empty
    class="w-full"
    label="No files"
    description="Upload a file to see it here."
    media-variant="icon"
  >
    <template #media>
      <Icon name="folderOpen" size="lg" />
    </template>
  </Empty>
</template>`
</script>

<template>
  <ComponentExample
    title="Media variant"
    description="Apply the icon visual style to the media content."
    :code="code"
    :show-reset="false"
  >
    <Empty
      class="w-full"
      label="No files"
      description="Upload a file to see it here."
      media-variant="icon"
    >
      <template #media>
        <Icon name="folderOpen" size="lg" />
      </template>
    </Empty>
  </ComponentExample>
</template>
