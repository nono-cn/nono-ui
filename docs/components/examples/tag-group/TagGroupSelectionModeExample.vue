<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  TagGroup,
  tagGroupDefaults,
  tagGroupSelectionModes,
  type TagGroupItem,
  type TagGroupModelValue,
  type TagGroupSelectionMode,
} from '@/components/TagGroup'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: TagGroupItem[] = [
  { label: 'News', value: 'news' },
  { label: 'Travel', value: 'travel' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Shopping', value: 'shopping' },
]
const selectionMode = ref<TagGroupSelectionMode>(tagGroupDefaults.selectionMode)
const value = ref<TagGroupModelValue | undefined>()

// el tipo del v-model cambia con el modo
const selectionModeModel = computed({
  get: () => selectionMode.value,
  set: (mode: TagGroupSelectionMode) => {
    selectionMode.value = mode
    value.value = mode === 'multiple' ? [] : undefined
  },
})

const valueCode = computed(() => {
  if (selectionMode.value === 'multiple') {
    const values = Array.isArray(value.value) ? value.value : []
    return `[${values.map((item) => `'${item}'`).join(', ')}]`
  }
  return value.value === undefined ? '' : `'${value.value}'`
})
const selected = computed(() => {
  if (value.value === undefined) return 'none'
  const values = Array.isArray(value.value) ? value.value : [value.value]
  return values.length ? values.join(', ') : 'none'
})

const code = computed(() =>
  selectionMode.value === 'none'
    ? `<script setup lang="ts">
import { TagGroup, type TagGroupItem } from '__DOCS_PACKAGE__/components/TagGroup'

const items: TagGroupItem[] = [
  { label: 'News', value: 'news' },
  { label: 'Travel', value: 'travel' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Shopping', value: 'shopping' },
]
${scriptEnd}

<template>
  <TagGroup :items="items" selection-mode="none" aria-label="Categories" />
</template>`
    : `<script setup lang="ts">
import { ref } from 'vue'
import { TagGroup, type TagGroupItem } from '__DOCS_PACKAGE__/components/TagGroup'

const items: TagGroupItem[] = [
  { label: 'News', value: 'news' },
  { label: 'Travel', value: 'travel' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Shopping', value: 'shopping' },
]
const value = ref(${valueCode.value})
${scriptEnd}

<template>
  <TagGroup v-model="value" :items="items" selection-mode="${selectionMode.value}" aria-label="Categories" />
</template>`,
)

function reset() {
  selectionModeModel.value = tagGroupDefaults.selectionMode
}
</script>

<template>
  <ComponentExample
    title="Selection mode"
    description="Make tags not selectable, or let the user select one tag or several with v-model."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="selectionModeModel"
        label="Selection mode"
        :options="tagGroupSelectionModes"
      />
    </template>
    <div class="grid gap-3">
      <TagGroup
        v-model="value"
        :items="items"
        :selection-mode="selectionMode"
        aria-label="Categories"
      />
      <p v-if="selectionMode !== 'none'" class="text-sm text-muted-foreground">
        Selected: {{ selected }}
      </p>
    </div>
  </ComponentExample>
</template>
