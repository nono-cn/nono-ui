<script setup lang="ts">
import { computed, ref } from 'vue'
import { TagGroup, type TagGroupItem, type TagGroupValue } from '@/components/TagGroup'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialItems: TagGroupItem[] = [
  { label: 'Design', value: 'design' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'DevOps', value: 'devops' },
]
const items = ref<TagGroupItem[]>([...initialItems])
const removable = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { TagGroup, type TagGroupItem, type TagGroupValue } from '__DOCS_PACKAGE__/components/TagGroup'

const items = ref<TagGroupItem[]>([
  { label: 'Design', value: 'design' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'DevOps', value: 'devops' },
])

function remove(values: TagGroupValue[]) {
  items.value = items.value.filter((item) => !values.includes(item.value))
}
${scriptEnd}

<template>
  <TagGroup :items="items" :removable="${removable.value}" aria-label="Teams" @remove="remove" />
</template>`,
)

function remove(values: TagGroupValue[]) {
  items.value = items.value.filter((item) => !values.includes(item.value))
}

function reset() {
  items.value = [...initialItems]
  removable.value = true
}
</script>

<template>
  <ComponentExample
    title="Removable"
    description="Show a remove button on every tag and drop the emitted values from your items; Delete and Backspace remove the focused tag."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="removable" label="Removable" />
    </template>
    <div class="grid gap-3">
      <TagGroup :items="items" :removable="removable" aria-label="Teams" @remove="remove" />
      <p v-if="!items.length" class="text-sm text-muted-foreground">No teams left.</p>
    </div>
  </ComponentExample>
</template>
