<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const options = ['true', 'false'] as const
const selectedLoop = ref<(typeof options)[number]>('true')
const loop = computed(() => selectedLoop.value === 'true')
const rating = ref(5)

function reset() {
  selectedLoop.value = 'true'
  rating.value = 5
}

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(${rating.value})
${scriptEnd}

<template>
  <Rating v-model="rating" :loop="${loop.value}" aria-label="Rating" />
</template>`,
)
</script>

<template>
  <ComponentExample
    title="Loop"
    description="Focus the last star and press the Right Arrow key to return to the first."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="selectedLoop"
        label="Loop"
        :options="options"
        class="w-28 [&_select]:min-w-0"
      />
    </template>
    <Rating v-model="rating" :loop="loop" aria-label="Rating" />
  </ComponentExample>
</template>
