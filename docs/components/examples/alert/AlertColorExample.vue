<script setup lang="ts">
import { computed, ref } from 'vue'
import { Alert, type AlertVariant } from '@/components/ui/Alert'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variants: AlertVariant[] = ['solid', 'outline', 'plain', 'subtle', 'soft']
const color = ref('#7c3aed')
const variant = ref<AlertVariant>('soft')

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'

const color = ref('${color.value}')
const variant = ref('${variant.value}' as const)
${scriptEnd}

<template>
  <Alert
    label="Custom theme"
    description="Choose a custom color and alert style."
    :color="color"
    :variant="variant"
  />
</template>`,
)

function reset() {
  color.value = '#7c3aed'
  variant.value = 'soft'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a custom alert color and visual style."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap items-end gap-4">
        <ExampleColorControl v-model="color" label="Color" />
        <ExampleSelectControl v-model="variant" label="Variant" :options="variants" />
      </div>
    </template>
    <div class="w-full max-w-2xl">
      <Alert
        label="Custom theme"
        description="Choose a custom color and alert style."
        :color="color"
        :variant="variant"
      />
    </div>
  </ComponentExample>
</template>
