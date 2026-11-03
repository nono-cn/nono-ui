<script setup lang="ts">
import { computed, ref } from 'vue'
import { TagGroup, type TagGroupItem, type TagGroupValue } from '@/components/TagGroup'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: TagGroupItem[] = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
]
const value = ref<TagGroupValue[]>(['monday'])
const disabled = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { TagGroup, type TagGroupItem } from '__DOCS_PACKAGE__/components/TagGroup'

const items: TagGroupItem[] = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
]
const value = ref([${value.value.map((item) => `'${item}'`).join(', ')}])
${scriptEnd}

<template>
  <TagGroup
    v-model="value"
    :items="items"
    selection-mode="multiple"
    :disabled="${disabled.value}"
    aria-label="Days"
  />
</template>`,
)

function reset() {
  value.value = ['monday']
  disabled.value = true
}
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Disable every tag of the group: they cannot be focused or selected."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="disabled" label="Disabled" />
    </template>
    <TagGroup
      v-model="value"
      :items="items"
      selection-mode="multiple"
      :disabled="disabled"
      aria-label="Days"
    />
  </ComponentExample>
</template>
