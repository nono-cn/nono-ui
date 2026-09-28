<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type RatingStep = 1 | 0.5 | 0.25 | 0.1

const steps = ['1', '0.5', '0.25', '0.1'] as const
const selectedStep = ref<(typeof steps)[number]>('0.5')
const step = computed(() => Number(selectedStep.value) as RatingStep)
const rating = ref(2.5)

watch(step, (value) => {
  rating.value = 2 + value
})

function reset() {
  selectedStep.value = '0.5'
  rating.value = 2.5
}

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(${rating.value})
${scriptEnd}

<template>
  <Rating v-model="rating" :step="${step.value}" aria-label="Rating" />
</template>`,
)
</script>

<template>
  <ComponentExample
    title="Step"
    description="Choose the increment between rating values."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="selectedStep"
        label="Step"
        :options="steps"
        class="w-28 [&_select]:min-w-0"
      />
    </template>
    <Rating v-model="rating" :step="step" aria-label="Rating" />
  </ComponentExample>
</template>
