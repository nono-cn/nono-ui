<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  TagGroup,
  tagGroupDefaults,
  type TagGroupItem,
  type TagGroupValue,
} from '@/components/TagGroup'
import { themeColors } from '@/components/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: TagGroupItem[] = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
]
const value = ref<TagGroupValue>('medium')
const colors = [...themeColors, 'custom']
const selectedColor = ref<string>(tagGroupDefaults.color)
const customColor = ref('#8b5cf6')
const color = computed(() =>
  selectedColor.value === 'custom' ? customColor.value : selectedColor.value,
)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { TagGroup, type TagGroupItem } from '__DOCS_PACKAGE__/components/TagGroup'

const items: TagGroupItem[] = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
]
const value = ref('${value.value}')
${scriptEnd}

<template>
  <TagGroup
    v-model="value"
    :items="items"
    selection-mode="single"
    color="${color.value}"
    aria-label="Size"
  />
</template>`,
)

function reset() {
  value.value = 'medium'
  selectedColor.value = tagGroupDefaults.color
  customColor.value = '#8b5cf6'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme token or a custom CSS color for selected tags and the focus ring."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="selectedColor" label="Color" :options="colors" />
        <ExampleColorControl
          v-if="selectedColor === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
      </div>
    </template>
    <TagGroup
      v-model="value"
      :items="items"
      selection-mode="single"
      :color="color"
      aria-label="Size"
    />
  </ComponentExample>
</template>
