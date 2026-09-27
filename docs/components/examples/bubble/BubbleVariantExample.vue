<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bubble, type BubbleVariant } from '@/components/ui/Bubble'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variants: BubbleVariant[] = ['solid', 'outline', 'plain', 'subtle', 'soft']
const variant = ref<BubbleVariant>('subtle')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Bubble, type BubbleVariant } from '__DOCS_PACKAGE__/components/ui/Bubble'

const variant = ref<BubbleVariant>('${variant.value}')
${scriptEnd}

<template>
  <Bubble :variant="variant">A message with the selected visual style.</Bubble>
</template>`,
)

function reset() {
  variant.value = 'subtle'
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Choose the visual style applied to the bubble."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="variants" />
      </div>
    </template>
    <Bubble :variant="variant">A message with the selected visual style.</Bubble>
  </ComponentExample>
</template>
