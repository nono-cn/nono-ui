<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const options = ['true', 'false'] as const
const selectedReadonly = ref<(typeof options)[number]>('true')
const readonly = computed(() => selectedReadonly.value === 'true')
const rating = ref(3)

function reset() {
  selectedReadonly.value = 'true'
  rating.value = 3
}

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(${rating.value})
${scriptEnd}

<template>
  <Rating v-model="rating" :readonly="${readonly.value}" aria-label="Rating" />
</template>`,
)
</script>

<template>
  <ComponentExample
    title="Readonly"
    description="Prevent changes while keeping the rating at full opacity."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="selectedReadonly"
        label="Readonly"
        :options="options"
        class="w-28 [&_select]:min-w-0"
      />
    </template>
    <Rating v-model="rating" :readonly="readonly" aria-label="Rating" />
  </ComponentExample>
</template>
