<script setup lang="ts">
import { ref } from 'vue'
import { TagGroup, type TagGroupItem, type TagGroupValue } from '@/components/TagGroup'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialItems: TagGroupItem[] = [
  { label: 'Bug', value: 'bug' },
  { label: 'Feature', value: 'feature' },
  { label: 'Docs', value: 'docs' },
]
const items = ref<TagGroupItem[]>([...initialItems])
const value = ref<TagGroupValue[]>(['feature'])
const dots: Record<string, string> = {
  bug: 'bg-red-500',
  feature: 'bg-emerald-500',
  docs: 'bg-sky-500',
}
const counts: Record<string, number> = { bug: 12, feature: 5, docs: 3 }
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { TagGroup, type TagGroupItem, type TagGroupValue } from '__DOCS_PACKAGE__/components/TagGroup'

const items = ref<TagGroupItem[]>([
  { label: 'Bug', value: 'bug' },
  { label: 'Feature', value: 'feature' },
  { label: 'Docs', value: 'docs' },
])
const value = ref<TagGroupValue[]>(['feature'])
const dots: Record<string, string> = {
  bug: 'bg-red-500',
  feature: 'bg-emerald-500',
  docs: 'bg-sky-500',
}
const counts: Record<string, number> = { bug: 12, feature: 5, docs: 3 }

function remove(values: TagGroupValue[]) {
  items.value = items.value.filter((item) => !values.includes(item.value))
}
${scriptEnd}

<template>
  <TagGroup
    v-model="value"
    :items="items"
    selection-mode="multiple"
    removable
    aria-label="Labels"
    @remove="remove"
  >
    <template #leading="{ item }">
      <span :class="['size-2 rounded-full', dots[item.value]]" />
    </template>
    <template #label="{ item, selected }">
      {{ item.label }}
      <span :class="selected ? 'opacity-80' : 'text-muted-foreground'">{{ counts[item.value] }}</span>
    </template>
    <template #deleteIcon>×</template>
    <template #empty>
      <span class="rounded-md border border-dashed px-2 py-0.5">Drop a label here</span>
    </template>
  </TagGroup>
</template>`

function remove(values: TagGroupValue[]) {
  items.value = items.value.filter((item) => !values.includes(item.value))
}

function reset() {
  items.value = [...initialItems]
  value.value = ['feature']
}
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Customize the leading content, the label, and the remove icon of every tag, and what shows when there are no tags."
    :code="code"
    @reset="reset"
  >
    <TagGroup
      v-model="value"
      :items="items"
      selection-mode="multiple"
      removable
      aria-label="Labels"
      @remove="remove"
    >
      <template #leading="{ item }">
        <span :class="['size-2 rounded-full', dots[item.value]]" />
      </template>
      <template #label="{ item, selected }">
        {{ item.label }}
        <span :class="selected ? 'opacity-80' : 'text-muted-foreground'">
          {{ counts[item.value] }}
        </span>
      </template>
      <template #deleteIcon>×</template>
      <template #empty>
        <span class="rounded-md border border-dashed px-2 py-0.5">Drop a label here</span>
      </template>
    </TagGroup>
  </ComponentExample>
</template>
