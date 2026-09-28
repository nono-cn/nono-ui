<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const options = ['true', 'false'] as const
const selectedDisabled = ref<(typeof options)[number]>('true')
const disabled = computed(() => selectedDisabled.value === 'true')
const rating = ref(3)

function reset() {
  selectedDisabled.value = 'true'
  rating.value = 3
}

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(${rating.value})
${scriptEnd}

<template>
  <Rating v-model="rating" :disabled="${disabled.value}" aria-label="Rating" />
</template>`,
)
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Display a rating without allowing changes."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="selectedDisabled"
        label="Disabled"
        :options="options"
        class="w-28 [&_select]:min-w-0"
      />
    </template>
    <Rating v-model="rating" :disabled="disabled" aria-label="Rating" />
  </ComponentExample>
</template>
