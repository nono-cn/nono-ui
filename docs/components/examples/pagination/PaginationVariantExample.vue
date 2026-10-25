<script setup lang="ts">
import { computed, ref } from 'vue'
import { buttonVariantNames, type ButtonVariant } from '@/components/ui/Button'
import { Pagination, paginationDefaults } from '@/components/ui/Pagination'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const page = ref(2)
const variant = ref<ButtonVariant>(paginationDefaults.variant)
const activeVariant = ref<ButtonVariant>(paginationDefaults.activeVariant)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from '__DOCS_PACKAGE__/components/ui/Pagination'

const page = ref(${page.value})
${scriptEnd}

<template>
  <Pagination
    v-model:page="page"
    :total="100"
    variant="${variant.value}"
    active-variant="${activeVariant.value}"
  />
</template>`,
)

function reset() {
  page.value = 2
  variant.value = paginationDefaults.variant
  activeVariant.value = paginationDefaults.activeVariant
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Use one Button variant for the pages and controls, and another for the current page."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="buttonVariantNames" />
        <ExampleSelectControl
          v-model="activeVariant"
          label="Active variant"
          :options="buttonVariantNames"
        />
      </div>
    </template>
    <Pagination
      v-model:page="page"
      :total="100"
      :variant="variant"
      :active-variant="activeVariant"
    />
  </ComponentExample>
</template>
