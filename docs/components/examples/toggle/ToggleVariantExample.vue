<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Toggle,
  toggleDefaults,
  toggleVariantNames,
  type ToggleVariant,
} from '@/components/ui/Toggle'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variant = ref<ToggleVariant>(toggleDefaults.variant)
const code = computed(
  () => `<script setup lang="ts">
import { Toggle } from '__DOCS_PACKAGE__/components/ui/Toggle'
${scriptEnd}

<template>
  <Toggle variant="${variant.value}" :model-value="true" label="Bold" aria-label="Toggle bold" />
</template>`,
)

function reset() {
  variant.value = toggleDefaults.variant
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Choose an outline or plain surface."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="toggleVariantNames" />
      </div>
    </template>
    <Toggle :variant="variant" :model-value="true" label="Bold" aria-label="Toggle bold" />
  </ComponentExample>
</template>
