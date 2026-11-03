<script setup lang="ts">
import { computed, ref } from 'vue'
import { TagGroup, tagGroupDefaults, type TagGroupItem } from '@/components/TagGroup'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: TagGroupItem[] = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
]
const radius = ref<string>(tagGroupDefaults.radius)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { TagGroup, type TagGroupItem } from '__DOCS_PACKAGE__/components/TagGroup'

const items: TagGroupItem[] = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
]
const radius = ref(${JSON.stringify(radius.value)})
${scriptEnd}

<template>
  <TagGroup :items="items" :radius="radius" aria-label="Level" />
</template>`,
)

function reset() {
  radius.value = tagGroupDefaults.radius
}
</script>

<template>
  <ComponentExample
    title="Radius"
    description="Use a Tailwind radius token, a CSS value, or a number of pixels."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleTextInputControl v-model="radius" label="Radius" placeholder="md, full, 12px…" />
    </template>
    <TagGroup :items="items" :radius="radius" aria-label="Level" />
  </ComponentExample>
</template>
