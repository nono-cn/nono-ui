<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Breadcrumb,
  breadcrumbDefaults,
  breadcrumbVariantNames,
  type BreadcrumbItem,
  type BreadcrumbVariant,
} from '@/components/ui/Breadcrumb'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: BreadcrumbItem[] = [
  { slot: 'home', label: 'Home', to: '/' },
  { slot: 'components', label: 'Components', to: '/components' },
  { slot: 'breadcrumb', label: 'Breadcrumb' },
]
const variant = ref<BreadcrumbVariant>(breadcrumbDefaults.variant)
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
  <Breadcrumb :items="items" variant="${variant.value}" aria-label="Breadcrumb" />
</template>`,
)

function reset() {
  variant.value = breadcrumbDefaults.variant
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Choose an unframed, outlined, or double-bordered breadcrumb."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="breadcrumbVariantNames" />
      </div>
    </template>
    <Breadcrumb :items="items" :variant="variant" aria-label="Breadcrumb" />
  </ComponentExample>
</template>
