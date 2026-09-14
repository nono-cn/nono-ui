<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bubble, type BubbleReactionsAlign, type BubbleReactionsSide } from '@/components/ui/Bubble'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const initialSide: BubbleReactionsSide = 'top'
const initialAlign: BubbleReactionsAlign = 'start'
const side = ref<BubbleReactionsSide>(initialSide)
const align = ref<BubbleReactionsAlign>(initialAlign)
const code = computed(
  () => `<script setup lang="ts">
import { Bubble } from '@nono-cn/nono-ui/components/ui/Bubble'
const side = '${side.value}'
const align = '${align.value}'
${scriptEnd}
<template>
  <div class="flex w-full flex-col gap-3">
    <Bubble :side-reaction="side" :align-reaction="align">
      ¿Te parece bien?
      <template #reactions>👍 ❤️ 🎉</template>
    </Bubble>
  </div>
</template>`,
)
function reset() {
  side.value = initialSide
  align.value = initialAlign
}
</script>
<template>
  <ComponentExample
    title="Reactions"
    description="Añade reacciones y controla su posición."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><div class="flex flex-wrap gap-4">
        <label class="grid gap-1.5 text-xs font-medium"
          >side<select
            v-model="side"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          >
            <option value="top">top</option>
            <option value="bottom">bottom</option>
          </select></label
        ><label class="grid gap-1.5 text-xs font-medium"
          >align<select
            v-model="align"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          >
            <option value="start">start</option>
            <option value="end">end</option>
          </select></label
        >
      </div></template
    >
    <div class="flex w-full flex-col gap-3">
      <Bubble :side-reaction="side" :align-reaction="align">
        ¿Te parece bien?
        <template #reactions>👍 ❤️ 🎉</template>
      </Bubble>
    </div>
  </ComponentExample>
</template>
