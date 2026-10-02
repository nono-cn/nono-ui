<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Empty,
  emptyDefaults,
  emptyMediaVariantNames,
  type EmptyMediaVariant,
} from '@/components/ui/Empty'
import { Icon } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialLabel = 'No files'
const initialDescription = 'Upload a file to see it here.'
const label = ref(initialLabel)
const description = ref(initialDescription)
const mediaVariant = ref<EmptyMediaVariant>(emptyDefaults.mediaVariant)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Empty, type EmptyMediaVariant } from '__DOCS_PACKAGE__/components/ui/Empty'
import { Icon } from '__DOCS_PACKAGE__/components/ui/Icon'

const label = ref(${JSON.stringify(label.value)})
const description = ref(${JSON.stringify(description.value)})
const mediaVariant = ref<EmptyMediaVariant>(${JSON.stringify(mediaVariant.value)})
${scriptEnd}

<template>
  <Empty
    class="w-full"
    :label="label"
    :description="description"
    :media-variant="mediaVariant"
  >
    <template #media>
      <Icon name="folderOpen" size="lg" />
    </template>
  </Empty>
</template>`,
)

function reset() {
  label.value = initialLabel
  description.value = initialDescription
  mediaVariant.value = emptyDefaults.mediaVariant
}
</script>

<template>
  <ComponentExample
    title="Media, label & description"
    description="Combine the media slot with editable label and description content."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleTextInputControl v-model="label" label="Label" />
        <ExampleTextInputControl v-model="description" label="Description" />
        <ExampleSelectControl
          v-model="mediaVariant"
          label="Media variant"
          :options="emptyMediaVariantNames"
        />
      </div>
    </template>
    <Empty class="w-full" :label="label" :description="description" :media-variant="mediaVariant">
      <template #media>
        <Icon name="folderOpen" size="lg" />
      </template>
    </Empty>
  </ComponentExample>
</template>
