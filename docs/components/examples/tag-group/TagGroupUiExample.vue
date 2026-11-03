<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  TagGroup,
  type TagGroupItem,
  type TagGroupUI,
  type TagGroupValue,
} from '@/components/TagGroup'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialItems: TagGroupItem[] = [
  { label: 'Favorites', value: 'favorites', icon: 'star' },
  { label: 'Liked', value: 'liked', icon: 'heart' },
  { label: 'Archived', value: 'archived', icon: 'folder' },
]
const items = ref<TagGroupItem[]>([...initialItems])
const value = ref<TagGroupValue[]>(['liked'])
const uppercase = ref(false)
const boldSelected = ref(true)
const destructiveDelete = ref(false)
const ui = computed<TagGroupUI>(() => ({
  item: () => ({ class: uppercase.value ? 'uppercase tracking-wide' : '' }),
  label: ({ selected }) => ({ class: boldSelected.value && selected ? 'font-semibold' : '' }),
  delete: () => ({
    class: destructiveDelete.value ? 'text-destructive hover:bg-destructive/15' : '',
  }),
  empty: () => ({ class: 'italic' }),
}))
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { TagGroup, type TagGroupItem, type TagGroupUI, type TagGroupValue } from '__DOCS_PACKAGE__/components/TagGroup'

const items = ref<TagGroupItem[]>([
  { label: 'Favorites', value: 'favorites', icon: 'star' },
  { label: 'Liked', value: 'liked', icon: 'heart' },
  { label: 'Archived', value: 'archived', icon: 'folder' },
])
const value = ref([${value.value.map((item) => `'${item}'`).join(', ')}])
const ui: TagGroupUI = {
  item: () => ({ class: '${uppercase.value ? 'uppercase tracking-wide' : ''}' }),
  label: ({ selected }) => ({
    class: ${boldSelected.value ? `selected ? 'font-semibold' : ''` : `''`},
  }),
  delete: () => ({ class: '${destructiveDelete.value ? 'text-destructive hover:bg-destructive/15' : ''}' }),
  empty: () => ({ class: 'italic' }),
}

function remove(values: TagGroupValue[]) {
  items.value = items.value.filter((item) => !values.includes(item.value))
}
${scriptEnd}

<template>
  <TagGroup
    v-model="value"
    :items="items"
    :ui="ui"
    empty="No collections."
    selection-mode="multiple"
    removable
    aria-label="Collections"
    @remove="remove"
  />
</template>`,
)

function remove(values: TagGroupValue[]) {
  items.value = items.value.filter((item) => !values.includes(item.value))
}

function reset() {
  items.value = [...initialItems]
  value.value = ['liked']
  uppercase.value = false
  boldSelected.value = true
  destructiveDelete.value = false
}
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize the tag, its label, and its remove button using the context of each tag, and the empty text."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleCheckboxControl v-model="uppercase" label="Uppercase tag" />
        <ExampleCheckboxControl v-model="boldSelected" label="Bold selected label" />
        <ExampleCheckboxControl v-model="destructiveDelete" label="Destructive remove" />
      </div>
    </template>
    <TagGroup
      v-model="value"
      :items="items"
      :ui="ui"
      empty="No collections."
      selection-mode="multiple"
      removable
      aria-label="Collections"
      @remove="remove"
    />
  </ComponentExample>
</template>
