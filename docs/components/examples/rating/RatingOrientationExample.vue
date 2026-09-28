<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const orientations = ['horizontal', 'vertical'] as const
const orientation = ref<(typeof orientations)[number]>('vertical')
const rating = ref(3)

function reset() {
  orientation.value = 'vertical'
  rating.value = 3
}

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(${rating.value})
${scriptEnd}

<template>
  <Rating v-model="rating" orientation="${orientation.value}" aria-label="Rating" />
</template>`,
)
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="Arrange rating items horizontally or vertically."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="orientation"
        label="Orientation"
        :options="orientations"
        class="w-32 [&_select]:min-w-0"
      />
    </template>
    <Rating v-model="rating" :orientation="orientation" aria-label="Rating" />
  </ComponentExample>
</template>
