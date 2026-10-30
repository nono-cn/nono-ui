<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  bubbleDefaults,
  bubbleReactionsSides,
  type BubbleReactionsSide,
} from '@/components/ui/Bubble'
import { Message } from '@/components/ui/Message'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const side = ref<BubbleReactionsSide>(bubbleDefaults.reactionsSide)
const code = computed(
  () => `<script setup lang="ts">
import { Message } from '__DOCS_PACKAGE__/components/ui/Message'
${scriptEnd}

<template>
  <Message :bubble="{ reactionsSide: '${side.value}' }" message="The release is out!">
    <template #header>Ana López</template>
    <template #reactions>
      <span role="img" aria-label="2 people reacted with a party popper">🎉 2</span>
    </template>
    <template #footer>10:24</template>
  </Message>
</template>`,
)

function reset() {
  side.value = bubbleDefaults.reactionsSide
}
</script>

<template>
  <ComponentExample
    title="Reactions"
    description="The reactions slot is passed to the bubble, which reserves space on the reactions side so they do not cover the header, the footer or nearby messages."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="side" label="Reaction side" :options="bubbleReactionsSides" />
    </template>
    <div class="w-full max-w-xl">
      <Message :bubble="{ reactionsSide: side }" message="The release is out!">
        <template #header>Ana López</template>
        <template #reactions>
          <span role="img" aria-label="2 people reacted with a party popper">🎉 2</span>
        </template>
        <template #footer>10:24</template>
      </Message>
    </div>
  </ComponentExample>
</template>
