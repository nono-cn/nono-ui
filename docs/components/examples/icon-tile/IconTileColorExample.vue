<script setup lang="ts">
import { computed, ref } from 'vue'
import { IconTile, iconTileVariantNames, type IconTileVariant } from '@/components/ui/IconTile'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colors = [...themeColors, 'custom']
const selectedColor = ref<string>('neutral')
const customColor = ref('#7c3aed')
const color = computed(() =>
  selectedColor.value === 'custom' ? customColor.value : selectedColor.value,
)
const variant = ref<IconTileVariant>('solid')
const code = computed(
  () => `<script setup lang="ts">
import { IconTile } from '__DOCS_PACKAGE__/components/ui/IconTile'
${scriptEnd}

<template>
  <IconTile icon="info" variant="${variant.value}" color="${color.value}" />
</template>`,
)

function reset() {
  selectedColor.value = 'neutral'
  customColor.value = '#7c3aed'
  variant.value = 'solid'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme token or a custom hexadecimal color for any variant."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="selectedColor" label="Color" :options="colors" />
        <ExampleColorControl
          v-if="selectedColor === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
        <ExampleSelectControl v-model="variant" label="Variant" :options="iconTileVariantNames" />
      </div>
    </template>
    <IconTile icon="info" :variant="variant" :color="color" />
  </ComponentExample>
</template>
