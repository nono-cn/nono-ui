<script setup lang="ts">
import { TagGroup, type TagGroupItem } from '@/components/TagGroup'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: TagGroupItem[] = [
  { label: 'Vue', value: 'vue' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Tailwind CSS', value: 'tailwind' },
  { label: 'Vite', value: 'vite' },
]
const code = `<script setup lang="ts">
import { TagGroup, type TagGroupItem } from '__DOCS_PACKAGE__/components/TagGroup'

const items: TagGroupItem[] = [
  { label: 'Vue', value: 'vue' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Tailwind CSS', value: 'tailwind' },
  { label: 'Vite', value: 'vite' },
]
${scriptEnd}

<template>
  <TagGroup :items="items" aria-label="Stack" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Pass the tags as items and name the group with aria-label."
    :code="code"
    :show-reset="false"
  >
    <TagGroup :items="items" aria-label="Stack" />
  </ComponentExample>
</template>
