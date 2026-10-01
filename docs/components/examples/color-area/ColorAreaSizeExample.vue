<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ColorArea,
  colorAreaDefaults,
  colorAreaSizes,
  type ColorAreaSize,
} from '@/components/ui/ColorArea'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<ColorAreaSize>(colorAreaDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { ColorArea, type ColorAreaSize } from '__DOCS_PACKAGE__/components/ui/ColorArea'

const size = ref<ColorAreaSize>('${size.value}')
${scriptEnd}

<template>
  <ColorArea :size="size" />
</template>`,
)

function reset() {
  size.value = colorAreaDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Choose the ColorArea dimensions."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="colorAreaSizes" />
      </div>
    </template>
    <ColorArea :size="size" />
  </ComponentExample>
</template>
