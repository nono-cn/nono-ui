<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox, checkboxDefaults } from '@/components/ui/Checkbox'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colors = [...themeColors, 'custom']
const selectedColor = ref<string>(checkboxDefaults.color)
const customColor = ref('#8b5cf6')
const color = computed(() =>
  selectedColor.value === 'custom' ? customColor.value : selectedColor.value,
)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'

const color = ref('${color.value}')
${scriptEnd}

<template>
  <Checkbox :value="true" :color="color" aria-label="Selected" />
</template>`,
)

function reset() {
  selectedColor.value = checkboxDefaults.color
  customColor.value = '#8b5cf6'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme token or a custom CSS color."
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
    <Checkbox :value="true" :color="color" aria-label="Selected" />
  </ComponentExample>
</template>
