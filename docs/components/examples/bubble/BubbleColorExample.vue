<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bubble, type BubbleVariant } from '@/components/ui/Bubble'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variants: BubbleVariant[] = ['solid', 'outline', 'plain', 'subtle', 'soft']
const color = ref('#8b5cf6')
const variant = ref<BubbleVariant>('subtle')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Bubble, type BubbleVariant } from '__DOCS_PACKAGE__/components/ui/Bubble'

const color = ref('${color.value}')
const variant = ref<BubbleVariant>('${variant.value}')
${scriptEnd}

<template>
  <Bubble :color="color" :variant="variant">
    A message using a custom color.
  </Bubble>
</template>`,
)

function reset() {
  color.value = '#8b5cf6'
  variant.value = 'subtle'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a custom color and see how each variant applies it."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap items-end gap-4">
        <ExampleColorControl v-model="color" label="Color" />
        <ExampleSelectControl v-model="variant" label="Variant" :options="variants" />
      </div>
    </template>
    <Bubble :color="color" :variant="variant">A message using a custom color.</Bubble>
  </ComponentExample>
</template>
