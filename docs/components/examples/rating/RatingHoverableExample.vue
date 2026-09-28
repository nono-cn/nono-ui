<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const options = ['true', 'false'] as const
const selectedHoverable = ref<(typeof options)[number]>('true')
const hoverable = computed(() => selectedHoverable.value === 'true')
const initialRating = 2
const rating = ref(initialRating)

function reset() {
  selectedHoverable.value = 'true'
  rating.value = initialRating
}

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(${rating.value})
${scriptEnd}

<template>
  <Rating v-model="rating" :hoverable="${hoverable.value}" aria-label="Rating" />
</template>`,
)
</script>

<template>
  <ComponentExample
    title="Hoverable"
    description="Preview a rating by hovering over its stars."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="selectedHoverable"
        label="Hoverable"
        :options="options"
        class="w-28 [&_select]:min-w-0"
      />
    </template>
    <Rating v-model="rating" :hoverable="hoverable" aria-label="Rating" />
  </ComponentExample>
</template>
