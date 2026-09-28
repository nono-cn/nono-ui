<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const color = ref('#8b5cf6')
const rating = ref(3)

function reset() {
  color.value = '#8b5cf6'
  rating.value = 3
}

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(${rating.value})
${scriptEnd}

<template>
  <Rating v-model="rating" color="${color.value}" severity="error" aria-label="Rating" />
</template>`,
)
</script>

<template>
  <ComponentExample
    title="Color"
    description="Use a custom CSS color instead of the semantic severity."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleColorControl v-model="color" label="Color" />
    </template>
    <Rating v-model="rating" :color="color" severity="error" aria-label="Rating" />
  </ComponentExample>
</template>
