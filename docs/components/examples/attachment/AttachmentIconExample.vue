<script setup lang="ts">
import { computed, ref } from 'vue'
import { Attachment } from '@/components/ui/Attachment'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const iconOptions: IconName[] = ['fileText', 'file', 'fileArchive', 'fileSpreadsheet', 'image']
const icon = ref<IconName>('fileText')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import type { IconName } from '__DOCS_PACKAGE__/components/ui/Icon'
import { Attachment } from '__DOCS_PACKAGE__/components/ui/Attachment'

const icon = ref<IconName>('${icon.value}')
${scriptEnd}

<template>
  <Attachment
    label="document.pdf"
    description="PDF · 2.4 MB"
    :icon="icon"
  />
</template>`,
)

function reset() {
  icon.value = 'fileText'
}
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Choose an icon to identify the file type."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="icon" label="Icon" :options="iconOptions" />
      </div>
    </template>
    <Attachment label="document.pdf" description="PDF · 2.4 MB" :icon="icon" />
  </ComponentExample>
</template>
