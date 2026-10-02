<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox } from '@/components/ui/Checkbox'
import {
  FieldSet,
  fieldSetDefaults,
  fieldSetLegendVariantNames,
  type FieldSetLegendVariant,
} from '@/components/ui/FieldSet'
import { Label } from '@/components/ui/Label'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialLegend = 'Preferences'
const initialDescription = 'Choose which updates you want to receive.'
const legend = ref(initialLegend)
const description = ref(initialDescription)
const legendVariant = ref<FieldSetLegendVariant>(fieldSetDefaults.legendVariant)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'
import { FieldSet, type FieldSetLegendVariant } from '__DOCS_PACKAGE__/components/ui/FieldSet'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'

const legend = ref(${JSON.stringify(legend.value)})
const description = ref(${JSON.stringify(description.value)})
const legendVariant = ref<FieldSetLegendVariant>(${JSON.stringify(legendVariant.value)})
${scriptEnd}

<template>
  <FieldSet
    class="w-full"
    :legend="legend"
    :description="description"
    :legend-variant="legendVariant"
  >
    <div class="flex items-center gap-2">
      <Checkbox id="product-news" />
      <Label for="product-news">Product news</Label>
    </div>
  </FieldSet>
</template>`,
)

function reset() {
  legend.value = initialLegend
  description.value = initialDescription
  legendVariant.value = fieldSetDefaults.legendVariant
}
</script>

<template>
  <ComponentExample
    title="Legend, description & variant"
    description="Edit the group name and supporting text, and choose the legend size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleTextInputControl v-model="legend" label="Legend" />
        <ExampleTextInputControl v-model="description" label="Description" />
        <ExampleSelectControl
          v-model="legendVariant"
          label="Legend variant"
          :options="fieldSetLegendVariantNames"
        />
      </div>
    </template>
    <FieldSet
      class="w-full"
      :legend="legend"
      :description="description"
      :legend-variant="legendVariant"
    >
      <div class="flex items-center gap-2">
        <Checkbox id="product-news" />
        <Label for="product-news">Product news</Label>
      </div>
    </FieldSet>
  </ComponentExample>
</template>
