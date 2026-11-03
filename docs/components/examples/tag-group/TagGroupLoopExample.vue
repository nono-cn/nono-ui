<script setup lang="ts">
import { computed, ref } from 'vue'
import { TagGroup, tagGroupDefaults, type TagGroupItem } from '@/components/TagGroup'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: TagGroupItem[] = [
  { label: 'First', value: 'first' },
  { label: 'Second', value: 'second' },
  { label: 'Third', value: 'third' },
  { label: 'Last', value: 'last' },
]
const loop = ref<boolean>(tagGroupDefaults.loop)
const code = computed(
  () => `<script setup lang="ts">
import { TagGroup, type TagGroupItem } from '__DOCS_PACKAGE__/components/TagGroup'

const items: TagGroupItem[] = [
  { label: 'First', value: 'first' },
  { label: 'Second', value: 'second' },
  { label: 'Third', value: 'third' },
  { label: 'Last', value: 'last' },
]
${scriptEnd}

<template>
  <TagGroup :items="items" :loop="${loop.value}" aria-label="Steps" />
</template>`,
)

function reset() {
  loop.value = tagGroupDefaults.loop
}
</script>

<template>
  <ComponentExample
    title="Loop"
    description="Focus a tag and use the arrow keys: with loop, focus wraps from the last tag to the first and back."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="loop" label="Loop" />
    </template>
    <TagGroup :items="items" :loop="loop" aria-label="Steps" />
  </ComponentExample>
</template>
