<script setup lang="ts">
import { computed, ref } from 'vue'
import { TagGroup, type TagGroupItem, type TagGroupValue } from '@/components/TagGroup'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: TagGroupItem[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
]
const value = ref<TagGroupValue[]>(['weekly'])
const disallowEmptySelection = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { TagGroup, type TagGroupItem } from '__DOCS_PACKAGE__/components/TagGroup'

const items: TagGroupItem[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
]
const value = ref([${value.value.map((item) => `'${item}'`).join(', ')}])
${scriptEnd}

<template>
  <TagGroup
    v-model="value"
    :items="items"
    selection-mode="multiple"
    :disallow-empty-selection="${disallowEmptySelection.value}"
    aria-label="Frequency"
  />
</template>`,
)

function reset() {
  value.value = ['weekly']
  disallowEmptySelection.value = true
}
</script>

<template>
  <ComponentExample
    title="Disallow empty selection"
    description="Keep at least one tag selected: the last selected tag cannot be deselected, not even with Escape."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="disallowEmptySelection" label="Disallow empty selection" />
    </template>
    <TagGroup
      v-model="value"
      :items="items"
      selection-mode="multiple"
      :disallow-empty-selection="disallowEmptySelection"
      aria-label="Frequency"
    />
  </ComponentExample>
</template>
