<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  TagGroup,
  tagGroupDefaults,
  tagGroupVariantNames,
  type TagGroupItem,
  type TagGroupValue,
  type TagGroupVariant,
} from '@/components/TagGroup'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: TagGroupItem[] = [
  { label: 'Wi-Fi', value: 'wifi' },
  { label: 'Parking', value: 'parking' },
  { label: 'Pool', value: 'pool' },
  { label: 'Breakfast', value: 'breakfast' },
]
const value = ref<TagGroupValue[]>(['wifi', 'pool'])
const variant = ref<TagGroupVariant>(tagGroupDefaults.variant)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { TagGroup, type TagGroupItem } from '__DOCS_PACKAGE__/components/TagGroup'

const items: TagGroupItem[] = [
  { label: 'Wi-Fi', value: 'wifi' },
  { label: 'Parking', value: 'parking' },
  { label: 'Pool', value: 'pool' },
  { label: 'Breakfast', value: 'breakfast' },
]
const value = ref([${value.value.map((item) => `'${item}'`).join(', ')}])
${scriptEnd}

<template>
  <TagGroup
    v-model="value"
    :items="items"
    selection-mode="multiple"
    variant="${variant.value}"
    aria-label="Amenities"
  />
</template>`,
)

function reset() {
  value.value = ['wifi', 'pool']
  variant.value = tagGroupDefaults.variant
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Choose how tags and selected tags look: bordered, softly filled, or solid."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="variant" label="Variant" :options="tagGroupVariantNames" />
    </template>
    <TagGroup
      v-model="value"
      :items="items"
      selection-mode="multiple"
      :variant="variant"
      aria-label="Amenities"
    />
  </ComponentExample>
</template>
