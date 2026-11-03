<script setup lang="ts">
import { computed, ref } from 'vue'
import { TagGroup, type TagGroupItem, type TagGroupValue } from '@/components/TagGroup'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: TagGroupItem[] = [
  { label: 'Label', value: 'label' },
  { label: 'Icon', value: 'icon', icon: 'star' },
  { label: 'Number value', value: 42 },
  { label: 'Disabled', value: 'disabled', disabled: true },
  { label: 'Disabled with icon', value: 'disabled-icon', icon: 'heart', disabled: true },
]
const value = ref<TagGroupValue[]>(['icon'])
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { TagGroup, type TagGroupItem, type TagGroupValue } from '__DOCS_PACKAGE__/components/TagGroup'

const items: TagGroupItem[] = [
  { label: 'Label', value: 'label' },
  { label: 'Icon', value: 'icon', icon: 'star' },
  { label: 'Number value', value: 42 },
  { label: 'Disabled', value: 'disabled', disabled: true },
  { label: 'Disabled with icon', value: 'disabled-icon', icon: 'heart', disabled: true },
]
const value = ref<TagGroupValue[]>([${value.value.map((item) => (typeof item === 'number' ? item : `'${item}'`)).join(', ')}])
${scriptEnd}

<template>
  <TagGroup v-model="value" :items="items" selection-mode="multiple" aria-label="Items" />
</template>`,
)

function reset() {
  value.value = ['icon']
}
</script>

<template>
  <ComponentExample
    title="Items"
    description="Each item needs a value and can have a label, an icon, and its own disabled state; the value can be a string or a number."
    :code="code"
    @reset="reset"
  >
    <TagGroup v-model="value" :items="items" selection-mode="multiple" aria-label="Items" />
  </ComponentExample>
</template>
