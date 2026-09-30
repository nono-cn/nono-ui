<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bubble, bubbleAlignments, type BubbleAlign } from '@/components/ui/Bubble'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const align = ref<BubbleAlign>('start')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Bubble, type BubbleAlign } from '__DOCS_PACKAGE__/components/ui/Bubble'

const align = ref<BubbleAlign>('${align.value}')
${scriptEnd}

<template>
  <div class="flex w-full flex-col gap-3">
    <Bubble :align="align">A message aligned at the selected side.</Bubble>
  </div>
</template>`,
)

function reset() {
  align.value = 'start'
}
</script>

<template>
  <ComponentExample
    title="Align"
    description="Place the bubble at the start or end of its container."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="align" label="Align" :options="bubbleAlignments" />
      </div>
    </template>
    <div class="flex w-full flex-col gap-3">
      <Bubble :align="align">A message aligned at the selected side.</Bubble>
    </div>
  </ComponentExample>
</template>
