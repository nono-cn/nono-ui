<script setup lang="ts">
import { MeterGroup, type MeterGroupItem } from '@/components/ui/MeterGroup'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: MeterGroupItem[] = [
  { label: 'Documents', value: 12, icon: 'fileText' },
  { label: 'Photos', value: 24, color: 'success', icon: 'image' },
  { label: 'Videos', value: 16, color: 'warning', icon: 'video' },
  { label: 'Music', value: 8, color: 'secondary', icon: 'audio' },
]
const code = `<script setup lang="ts">
import { MeterGroup, type MeterGroupItem } from '__DOCS_PACKAGE__/components/ui/MeterGroup'

const items: MeterGroupItem[] = [
  { label: 'Documents', value: 12, icon: 'fileText' },
  { label: 'Photos', value: 24, color: 'success', icon: 'image' },
  { label: 'Videos', value: 16, color: 'warning', icon: 'video' },
  { label: 'Music', value: 8, color: 'secondary', icon: 'audio' },
]
${scriptEnd}

<template>
  <MeterGroup :items="items" class="w-full max-w-md" />
</template>`
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Replace the legend marker with an icon tinted with the item color."
    :code="code"
    :show-reset="false"
  >
    <MeterGroup :items="items" class="w-full max-w-md" />
  </ComponentExample>
</template>
