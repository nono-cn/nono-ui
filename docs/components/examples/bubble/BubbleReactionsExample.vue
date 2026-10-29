<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Bubble,
  bubbleDefaults,
  bubbleReactionsAlignments,
  bubbleReactionsSides,
  type BubbleReactionsAlign,
  type BubbleReactionsSide,
} from '@/components/ui/Bubble'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const reactionsSide = ref<BubbleReactionsSide>(bubbleDefaults.reactionsSide)
const reactionsAlign = ref<BubbleReactionsAlign>(bubbleDefaults.reactionsAlign)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import {
  Bubble,
  type BubbleReactionsAlign,
  type BubbleReactionsSide,
} from '__DOCS_PACKAGE__/components/ui/Bubble'

const reactionsSide = ref<BubbleReactionsSide>('${reactionsSide.value}')
const reactionsAlign = ref<BubbleReactionsAlign>('${reactionsAlign.value}')
${scriptEnd}

<template>
  <Bubble :reactions-side="reactionsSide" :reactions-align="reactionsAlign">
    Message with reactions
    <template #reactions>
      <span role="img" aria-label="Like">👍</span>
      <span role="img" aria-label="Celebrate">🎉</span>
    </template>
  </Bubble>
</template>`,
)

function reset() {
  reactionsSide.value = bubbleDefaults.reactionsSide
  reactionsAlign.value = bubbleDefaults.reactionsAlign
}
</script>

<template>
  <ComponentExample
    title="Reactions"
    description="Choose where reactions appear around the bubble."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="reactionsSide" label="Side" :options="bubbleReactionsSides" />
        <ExampleSelectControl
          v-model="reactionsAlign"
          label="Alignment"
          :options="bubbleReactionsAlignments"
        />
      </div>
    </template>
    <div class="flex w-full flex-col gap-8 py-4">
      <Bubble :reactions-side="reactionsSide" :reactions-align="reactionsAlign">
        Message with reactions
        <template #reactions>
          <span role="img" aria-label="Like">👍</span>
          <span role="img" aria-label="Celebrate">🎉</span>
        </template>
      </Bubble>
    </div>
  </ComponentExample>
</template>
