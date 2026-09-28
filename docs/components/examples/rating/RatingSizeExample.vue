<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating, type RatingSize } from '@/components/ui/Rating'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const sizes: RatingSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const size = ref<RatingSize>('md')
const rating = ref(3)

function reset() {
  size.value = 'md'
  rating.value = 3
}

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(${rating.value})
${scriptEnd}

<template>
  <Rating v-model="rating" size="${size.value}" aria-label="Rating" />
</template>`,
)
</script>

<template>
  <ComponentExample
    title="Size"
    description="Change the size of the rating items."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="size"
        label="Size"
        :options="sizes"
        class="w-28 [&_select]:min-w-0"
      />
    </template>
    <Rating v-model="rating" :size="size" aria-label="Rating" />
  </ComponentExample>
</template>
