<script setup lang="ts">
import { computed, ref } from 'vue'
import { Separator, type SeparatorProps } from '@/components/ui/Separator'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const orientations = ['horizontal', 'vertical'] as const
const orientation = ref<NonNullable<SeparatorProps['orientation']>>('horizontal')
const layoutClass = computed(() =>
  orientation.value === 'horizontal'
    ? 'flex w-full max-w-sm flex-col gap-4'
    : 'flex h-32 items-stretch gap-4',
)
const code = computed(
  () => `<script setup lang="ts">
import { Separator } from '__DOCS_PACKAGE__/components/ui/Separator'
${scriptEnd}

<template>
  <div class="${layoutClass.value}">
    <span>First</span>
    <Separator orientation="${orientation.value}" />
    <span>Second</span>
  </div>
</template>`,
)

function reset() {
  orientation.value = 'horizontal'
}
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="Choose a horizontal or vertical separator."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="orientation" label="Orientation" :options="orientations" />
    </template>
    <div :class="layoutClass">
      <span>First</span>
      <Separator :orientation="orientation" />
      <span>Second</span>
    </div>
  </ComponentExample>
</template>
