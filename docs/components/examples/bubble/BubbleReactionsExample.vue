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

const sideReaction = ref<BubbleReactionsSide>(bubbleDefaults.sideReaction)
const alignReaction = ref<BubbleReactionsAlign>(bubbleDefaults.alignReaction)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import {
  Bubble,
  type BubbleReactionsAlign,
  type BubbleReactionsSide,
} from '__DOCS_PACKAGE__/components/ui/Bubble'

const sideReaction = ref<BubbleReactionsSide>('${sideReaction.value}')
const alignReaction = ref<BubbleReactionsAlign>('${alignReaction.value}')
${scriptEnd}

<template>
  <Bubble :side-reaction="sideReaction" :align-reaction="alignReaction">
    Message with reactions
    <template #reactions>
      <span role="img" aria-label="Like">👍</span>
      <span role="img" aria-label="Celebrate">🎉</span>
    </template>
  </Bubble>
</template>`,
)

function reset() {
  sideReaction.value = bubbleDefaults.sideReaction
  alignReaction.value = bubbleDefaults.alignReaction
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
        <ExampleSelectControl v-model="sideReaction" label="Side" :options="bubbleReactionsSides" />
        <ExampleSelectControl
          v-model="alignReaction"
          label="Alignment"
          :options="bubbleReactionsAlignments"
        />
      </div>
    </template>
    <div class="flex w-full flex-col gap-8 py-4">
      <Bubble :side-reaction="sideReaction" :align-reaction="alignReaction">
        Message with reactions
        <template #reactions>
          <span role="img" aria-label="Like">👍</span>
          <span role="img" aria-label="Celebrate">🎉</span>
        </template>
      </Bubble>
    </div>
  </ComponentExample>
</template>
