<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Marker,
  markerDefaults,
  markerVariantNames,
  type MarkerVariant,
} from '@/components/ui/Marker'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variant = ref<MarkerVariant>(markerDefaults.variant)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Marker, type MarkerVariant } from '__DOCS_PACKAGE__/components/ui/Marker'

const variant = ref<MarkerVariant>('${variant.value}')
${scriptEnd}

<template>
  <Marker :variant="variant" label="Value updated" />
</template>`,
)

function reset() {
  variant.value = markerDefaults.variant
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Adapt the visual separation to the content context."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="markerVariantNames" />
      </div>
    </template>
    <Marker :variant="variant" label="Value updated" />
  </ComponentExample>
</template>
