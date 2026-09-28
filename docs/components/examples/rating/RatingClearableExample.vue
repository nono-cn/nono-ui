<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const options = ['true', 'false'] as const
const selectedClearable = ref<(typeof options)[number]>('true')
const clearable = computed(() => selectedClearable.value === 'true')
const initialRating = 3
const rating = ref(initialRating)

function reset() {
  selectedClearable.value = 'true'
  rating.value = initialRating
}

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(${rating.value})
${scriptEnd}

<template>
  <Rating v-model="rating" :clearable="${clearable.value}" aria-label="Rating" />
</template>`,
)
</script>

<template>
  <ComponentExample
    title="Clearable"
    description="Click the selected rating again to clear it."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="selectedClearable"
        label="Clearable"
        :options="options"
        class="w-28 [&_select]:min-w-0"
      />
    </template>
    <Rating v-model="rating" :clearable="clearable" aria-label="Rating" />
  </ComponentExample>
</template>
