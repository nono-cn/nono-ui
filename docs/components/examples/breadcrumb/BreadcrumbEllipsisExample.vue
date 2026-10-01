<script setup lang="ts">
import { computed, ref } from 'vue'
import { Breadcrumb, breadcrumbDefaults, type BreadcrumbItem } from '@/components/ui/Breadcrumb'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: BreadcrumbItem[] = [
  { slot: 'home', label: 'Home', to: '/' },
  { slot: 'docs', label: 'Docs', to: '/components' },
  { slot: 'components', label: 'Components', to: '/components' },
  { slot: 'breadcrumb', label: 'Breadcrumb' },
]
const rangeOptions = ['none', '0–2', '1–2'] as const
const range = ref<(typeof rangeOptions)[number]>('0–2')
const ellipsisIconOptions: IconName[] = ['moreHorizontal', 'plus', 'info']
const ellipsisIcon = ref<IconName>(breadcrumbDefaults.ellipsisIcon)
const ellipsisIndex = computed<[number, number] | undefined>(() =>
  range.value === 'none' ? undefined : range.value === '0–2' ? [0, 2] : [1, 2],
)
const code = computed(
  () => `<script setup lang="ts">
import { Breadcrumb, type BreadcrumbItem } from '__DOCS_PACKAGE__/components/ui/Breadcrumb'

const items: BreadcrumbItem[] = [
  { slot: 'home', label: 'Home', to: '/' },
  { slot: 'docs', label: 'Docs', to: '/components' },
  { slot: 'components', label: 'Components', to: '/components' },
  { slot: 'breadcrumb', label: 'Breadcrumb' },
]
${ellipsisIndex.value ? `const ellipsisIndex: [number, number] = [${ellipsisIndex.value.join(', ')}]` : ''}
${scriptEnd}

<template>
  <Breadcrumb :items="items"${ellipsisIndex.value ? ' :ellipsis-index="ellipsisIndex"' : ''} ellipsis-icon="${ellipsisIcon.value}" aria-label="Breadcrumb" />
</template>`,
)

function reset() {
  range.value = '0–2'
  ellipsisIcon.value = breadcrumbDefaults.ellipsisIcon
}
</script>

<template>
  <ComponentExample
    title="Ellipsis range"
    description="Choose the collapsed range and the icon displayed in its place."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="range" label="Range" :options="rangeOptions" />
        <ExampleSelectControl
          v-model="ellipsisIcon"
          label="Ellipsis icon"
          :options="ellipsisIconOptions"
        />
      </div>
    </template>
    <Breadcrumb
      :items="items"
      :ellipsis-index="ellipsisIndex"
      :ellipsis-icon="ellipsisIcon"
      aria-label="Breadcrumb"
    />
  </ComponentExample>
</template>
