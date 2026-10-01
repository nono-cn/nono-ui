<script setup lang="ts">
import { computed, ref } from 'vue'
import { Breadcrumb, breadcrumbDefaults, type BreadcrumbItem } from '@/components/ui/Breadcrumb'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: BreadcrumbItem[] = [
  { slot: 'home', label: 'Home', to: '/' },
  { slot: 'components', label: 'Components', to: '/components' },
  { slot: 'breadcrumb', label: 'Breadcrumb' },
]
const separatorOptions: IconName[] = ['chevronRight', 'minus', 'chevronsRight']
const separatorIcon = ref<IconName>(breadcrumbDefaults.separatorIcon)
const code = computed(
  () => `<script setup lang="ts">
import { Breadcrumb, type BreadcrumbItem } from '__DOCS_PACKAGE__/components/ui/Breadcrumb'

const items: BreadcrumbItem[] = [
  { slot: 'home', label: 'Home', to: '/' },
  { slot: 'components', label: 'Components', to: '/components' },
  { slot: 'breadcrumb', label: 'Breadcrumb' },
]
${scriptEnd}

<template>
  <Breadcrumb :items="items" separator-icon="${separatorIcon.value}" aria-label="Breadcrumb" />
</template>`,
)

function reset() {
  separatorIcon.value = breadcrumbDefaults.separatorIcon
}
</script>

<template>
  <ComponentExample
    title="Separator icon"
    description="Choose the icon displayed between breadcrumb items."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="separatorIcon"
          label="Separator icon"
          :options="separatorOptions"
        />
      </div>
    </template>
    <Breadcrumb :items="items" :separator-icon="separatorIcon" aria-label="Breadcrumb" />
  </ComponentExample>
</template>
