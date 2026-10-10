<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const shapes = ['diamond', 'spark'] as const
const shape = ref<(typeof shapes)[number]>('diamond')
const paths = {
  diamond: 'M12 2 21 12 12 22 3 12Z',
  spark: 'M12 2 14.5 9.5 22 12 14.5 14.5 12 22 9.5 14.5 2 12 9.5 9.5Z',
}
const code = computed(
  () => `<script setup lang="ts">
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'
${scriptEnd}

<template>
  <Rating :model-value="3" aria-label="Product rating">
    <template #item="{ iconClass }">
      <svg :class="iconClass" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="${paths[shape.value]}" />
      </svg>
    </template>
  </Rating>
</template>`,
)

function reset() {
  shape.value = 'diamond'
}
</script>

<template>
  <ComponentExample
    title="Item slot"
    description="Replace the icon while retaining Rating's selected-state styling through iconClass."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><ExampleSelectControl v-model="shape" label="Shape" :options="shapes"
    /></template>
    <Rating :model-value="3" aria-label="Product rating">
      <template #item="{ iconClass }">
        <svg
          :class="iconClass"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path :d="paths[shape]" />
        </svg>
      </template>
    </Rating>
  </ComponentExample>
</template>
