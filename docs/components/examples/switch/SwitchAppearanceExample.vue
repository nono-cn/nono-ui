<script setup lang="ts">
import { computed, ref } from 'vue'
import { Switch, switchDefaults } from '@/components/ui/Switch'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colorOptions = [...themeColors, 'custom']
const colorChoice = ref<string>(switchDefaults.color)
const customColor = ref('#8b5cf6')
const color = computed(() =>
  colorChoice.value === 'custom' ? customColor.value : colorChoice.value,
)
const code = computed(
  () => `<script setup lang="ts">
import { Switch } from '__DOCS_PACKAGE__/components/ui/Switch'
${scriptEnd}

<template>
  <Switch :model-value="true" color="${color.value}" aria-label="Enabled" />
</template>`,
)

function reset() {
  colorChoice.value = switchDefaults.color
  customColor.value = '#8b5cf6'
}
</script>

<template>
  <ComponentExample
    title="Appearance"
    description="Choose a theme color or a custom CSS color."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4 [&_select]:w-36">
        <ExampleSelectControl v-model="colorChoice" label="Color" :options="colorOptions" />
        <ExampleColorControl
          v-if="colorChoice === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
      </div>
    </template>
    <Switch :model-value="true" :color="color" aria-label="Enabled" />
  </ComponentExample>
</template>
