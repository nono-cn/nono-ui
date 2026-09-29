<script setup lang="ts">
import { computed, ref } from 'vue'
import { Attachment, type AttachmentSize } from '@/components/ui/Attachment'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const sizes: AttachmentSize[] = ['md', 'sm', 'xs']
const size = ref<AttachmentSize>('md')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Attachment, type AttachmentSize } from '__DOCS_PACKAGE__/components/ui/Attachment'

const size = ref<AttachmentSize>('${size.value}')
${scriptEnd}

<template>
  <Attachment
    label="document.pdf"
    description="PDF · 2.4 MB"
    :size="size"
    icon="fileText"
  />
</template>`,
)

function reset() {
  size.value = 'md'
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Choose the size of the media and file details."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="sizes" />
      </div>
    </template>
    <Attachment label="document.pdf" description="PDF · 2.4 MB" :size="size" icon="fileText" />
  </ComponentExample>
</template>
