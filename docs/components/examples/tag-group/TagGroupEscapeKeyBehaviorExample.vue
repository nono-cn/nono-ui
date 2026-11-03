<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  TagGroup,
  tagGroupDefaults,
  tagGroupEscapeKeyBehaviors,
  type TagGroupItem,
  type TagGroupValue,
} from '@/components/TagGroup'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type EscapeKeyBehavior = (typeof tagGroupEscapeKeyBehaviors)[number]

const items: TagGroupItem[] = [
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
]
const value = ref<TagGroupValue[]>(['red', 'blue'])
const escapeKeyBehavior = ref<EscapeKeyBehavior>(tagGroupDefaults.escapeKeyBehavior)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { TagGroup, type TagGroupItem } from '__DOCS_PACKAGE__/components/TagGroup'

const items: TagGroupItem[] = [
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
]
const value = ref([${value.value.map((item) => `'${item}'`).join(', ')}])
${scriptEnd}

<template>
  <TagGroup
    v-model="value"
    :items="items"
    selection-mode="multiple"
    escape-key-behavior="${escapeKeyBehavior.value}"
    aria-label="Colors"
  />
</template>`,
)

function reset() {
  value.value = ['red', 'blue']
  escapeKeyBehavior.value = tagGroupDefaults.escapeKeyBehavior
}
</script>

<template>
  <ComponentExample
    title="Escape key behavior"
    description="Focus a tag and press Escape: it clears the selection with clearSelection and does nothing with none."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="escapeKeyBehavior"
        label="Escape key behavior"
        :options="tagGroupEscapeKeyBehaviors"
      />
    </template>
    <TagGroup
      v-model="value"
      :items="items"
      selection-mode="multiple"
      :escape-key-behavior="escapeKeyBehavior"
      aria-label="Colors"
    />
  </ComponentExample>
</template>
