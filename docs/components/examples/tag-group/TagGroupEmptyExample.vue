<script setup lang="ts">
import { computed, ref } from 'vue'
import { TagGroup, type TagGroupItem, type TagGroupValue } from '@/components/TagGroup'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialItems: TagGroupItem[] = [
  { label: 'Urgent', value: 'urgent' },
  { label: 'Review', value: 'review' },
]
const items = ref<TagGroupItem[]>([...initialItems])
const empty = ref('No labels yet.')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { TagGroup, type TagGroupItem, type TagGroupValue } from '__DOCS_PACKAGE__/components/TagGroup'

const items = ref<TagGroupItem[]>([
  { label: 'Urgent', value: 'urgent' },
  { label: 'Review', value: 'review' },
])

function remove(values: TagGroupValue[]) {
  items.value = items.value.filter((item) => !values.includes(item.value))
}
${scriptEnd}

<template>
  <TagGroup
    :items="items"
    empty="${empty.value}"
    removable
    aria-label="Labels"
    @remove="remove"
  />
</template>`,
)

function remove(values: TagGroupValue[]) {
  items.value = items.value.filter((item) => !values.includes(item.value))
}

function reset() {
  items.value = [...initialItems]
  empty.value = 'No labels yet.'
}
</script>

<template>
  <ComponentExample
    title="Empty"
    description="Remove every tag to show the empty text; it is only rendered while items is empty."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleTextInputControl v-model="empty" label="Empty" placeholder="No labels yet." />
    </template>
    <TagGroup :items="items" :empty="empty" removable aria-label="Labels" @remove="remove" />
  </ComponentExample>
</template>
