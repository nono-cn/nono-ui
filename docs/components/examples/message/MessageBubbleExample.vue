<script setup lang="ts">
import { computed, ref } from 'vue'
import { bubbleVariantNames, type BubbleVariant } from '@/components/ui/Bubble'
import { themeColors } from '@/components/ui/constants'
import { Message, type MessageBubbleProps } from '@/components/ui/Message'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variant = ref<BubbleVariant>('solid')
const color = ref('primary')
const bubble = computed<MessageBubbleProps>(() => ({
  variant: variant.value,
  color: color.value,
}))
const code = computed(
  () => `<script setup lang="ts">
import { Message } from '__DOCS_PACKAGE__/components/ui/Message'

const bubble = ${JSON.stringify(bubble.value)}
${scriptEnd}

<template>
  <Message align="end" :bubble="bubble" message="Bubble props style the message." />
</template>`,
)

function reset() {
  variant.value = 'solid'
  color.value = 'primary'
}
</script>

<template>
  <ComponentExample
    title="Bubble"
    description="Pass Bubble props, except align, to change its variant, color or radius."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="bubbleVariantNames" />
        <ExampleSelectControl v-model="color" label="Color" :options="themeColors" />
      </div>
    </template>
    <div class="w-full max-w-xl">
      <Message align="end" :bubble="bubble" message="Bubble props style the message." />
    </div>
  </ComponentExample>
</template>
