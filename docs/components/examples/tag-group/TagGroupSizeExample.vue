<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  TagGroup,
  tagGroupDefaults,
  tagGroupSizes,
  type TagGroupItem,
  type TagGroupSize,
} from '@/components/TagGroup'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: TagGroupItem[] = [
  { label: 'Photos', value: 'photos', icon: 'image' },
  { label: 'Music', value: 'music', icon: 'audio' },
  { label: 'Movies', value: 'movies', icon: 'video' },
]
const size = ref<TagGroupSize>(tagGroupDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { TagGroup, type TagGroupItem } from '__DOCS_PACKAGE__/components/TagGroup'

const items: TagGroupItem[] = [
  { label: 'Photos', value: 'photos', icon: 'image' },
  { label: 'Music', value: 'music', icon: 'audio' },
  { label: 'Movies', value: 'movies', icon: 'video' },
]
${scriptEnd}

<template>
  <TagGroup :items="items" size="${size.value}" aria-label="Media" />
</template>`,
)

function reset() {
  size.value = tagGroupDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Change the height, padding, text, and icon size of the tags."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="size" label="Size" :options="tagGroupSizes" />
    </template>
    <TagGroup :items="items" :size="size" aria-label="Media" />
  </ComponentExample>
</template>
