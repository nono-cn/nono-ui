<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Attachment,
  attachmentMediaVariantNames,
  attachmentStateNames,
  type AttachmentMediaVariant,
  type AttachmentState,
} from '@/components/ui/Attachment'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const mediaVariant = ref<AttachmentMediaVariant>('icon')
const state = ref<AttachmentState>('idle')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Attachment, type AttachmentMediaVariant, type AttachmentState } from '__DOCS_PACKAGE__/components/ui/Attachment'

const mediaVariant = ref<AttachmentMediaVariant>('${mediaVariant.value}')
const state = ref<AttachmentState>('${state.value}')
${scriptEnd}

<template>
  <Attachment
    label="landscape.jpg"
    description="JPG · 1.8 MB"
    :media-variant="mediaVariant"
    :state="state"
    icon="image"
  >
    <template #media>
      <div class="size-full bg-gradient-to-br from-sky-400 to-indigo-600" role="img" aria-label="Landscape preview" />
    </template>
  </Attachment>
</template>`,
)

function reset() {
  mediaVariant.value = 'icon'
  state.value = 'idle'
}
</script>

<template>
  <ComponentExample
    title="Media variant"
    description="Choose between an icon and custom image media."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="mediaVariant"
          label="Media variant"
          :options="attachmentMediaVariantNames"
        />
        <ExampleSelectControl v-model="state" label="State" :options="attachmentStateNames" />
      </div>
    </template>
    <Attachment
      label="landscape.jpg"
      description="JPG · 1.8 MB"
      :media-variant="mediaVariant"
      :state="state"
      icon="image"
    >
      <template #media>
        <div
          class="size-full bg-gradient-to-br from-sky-400 to-indigo-600"
          role="img"
          aria-label="Landscape preview"
        />
      </template>
    </Attachment>
  </ComponentExample>
</template>
