<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button, type ButtonVariant } from '@/components/ui/Button'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variants: ButtonVariant[] = ['solid', 'outline', 'plain', 'subtle', 'soft', 'link']
const color = ref('#6366f1')
const variant = ref<ButtonVariant>('solid')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const color = ref('${color.value}')
const variant = ref('${variant.value}' as const)
${scriptEnd}

<template>
  <Button label="Save changes" :color="color" :variant="variant" />
</template>`,
)

function reset() {
  color.value = '#6366f1'
  variant.value = 'solid'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a custom CSS color and visual style for the button."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleColorControl v-model="color" label="Color" />
        <ExampleSelectControl v-model="variant" label="Variant" :options="variants" />
      </div>
    </template>
    <Button label="Save changes" :color="color" :variant="variant" />
  </ComponentExample>
</template>
