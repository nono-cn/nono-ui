<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colors = ['currentColor', ...themeColors, 'custom']
const selectedColor = ref('primary')
const customColor = ref('#6366f1')
const color = computed(() =>
  selectedColor.value === 'custom' ? customColor.value : selectedColor.value,
)
const code = computed(
  () => `<script setup lang="ts">
import { Icon } from '__DOCS_PACKAGE__/components/ui/Icon'
${scriptEnd}

<template>
  <Icon name="check" color="${color.value}" />
</template>`,
)

function reset() {
  selectedColor.value = 'primary'
  customColor.value = '#6366f1'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme color, inherit currentColor, or use a custom hexadecimal color."
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
      </div>
    </template>
    <Icon name="check" :color="color" />
  </ComponentExample>
</template>
