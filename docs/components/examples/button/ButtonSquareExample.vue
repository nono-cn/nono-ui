<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const booleanOptions = ['true', 'false'] as const
const selectedSquare = ref<(typeof booleanOptions)[number]>('true')
const square = computed(() => selectedSquare.value === 'true')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const square = ref(${square.value})
${scriptEnd}

<template>
  <Button icon="plus" :square="square" aria-label="Add item" />
</template>`,
)

function reset() {
  selectedSquare.value = 'true'
}
</script>

<template>
  <ComponentExample
    title="Square"
    description="Toggle equal width and height for an icon button."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="selectedSquare" label="Square" :options="booleanOptions" />
      </div>
    </template>
    <Button icon="plus" :square="square" aria-label="Add item" />
  </ComponentExample>
</template>
