<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bubble, type BubbleSeverity, type BubbleVariant } from '@/components/ui/Bubble'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const severities: BubbleSeverity[] = [
  'primary',
  'neutral',
  'secondary',
  'warning',
  'success',
  'error',
]
const variants: BubbleVariant[] = ['solid', 'outline', 'plain', 'subtle', 'soft']
const severity = ref<BubbleSeverity>('neutral')
const variant = ref<BubbleVariant>('subtle')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Bubble, type BubbleSeverity, type BubbleVariant } from '__DOCS_PACKAGE__/components/ui/Bubble'

const severity = ref<BubbleSeverity>('${severity.value}')
const variant = ref<BubbleVariant>('${variant.value}')
${scriptEnd}

<template>
  <Bubble :severity="severity" :variant="variant">
    A message using the selected severity and style.
  </Bubble>
</template>`,
)

function reset() {
  severity.value = 'neutral'
  variant.value = 'subtle'
}
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Choose the semantic color and visual style of the bubble."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="severity" label="Severity" :options="severities" />
        <ExampleSelectControl v-model="variant" label="Variant" :options="variants" />
      </div>
    </template>
    <Bubble :severity="severity" :variant="variant">
      A message using the selected severity and style.
    </Bubble>
  </ComponentExample>
</template>
