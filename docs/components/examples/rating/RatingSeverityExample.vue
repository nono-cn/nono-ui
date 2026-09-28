<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating, type RatingSeverity } from '@/components/ui/Rating'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const severities: RatingSeverity[] = [
  'primary',
  'secondary',
  'neutral',
  'warning',
  'success',
  'error',
]
const severity = ref<RatingSeverity>('success')
const rating = ref(3)

function reset() {
  severity.value = 'success'
  rating.value = 3
}

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(${rating.value})
${scriptEnd}

<template>
  <Rating v-model="rating" severity="${severity.value}" aria-label="Rating" />
</template>`,
)
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Choose a semantic color for the rating and its focus ring."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="severity"
        label="Severity"
        :options="severities"
        class="w-32 [&_select]:min-w-0"
      />
    </template>
    <Rating v-model="rating" :severity="severity" aria-label="Rating" />
  </ComponentExample>
</template>
