<script setup lang="ts">
import { computed, ref } from 'vue'
import { Separator, separatorDefaults } from '@/components/ui/Separator'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colors = [...themeColors, 'custom']
const colorChoice = ref<string>(separatorDefaults.color)
const customColor = ref('#8b5cf6')
const color = computed(() =>
  colorChoice.value === 'custom' ? customColor.value : colorChoice.value,
)
const code = computed(
  () => `<script setup lang="ts">
import { Separator } from '__DOCS_PACKAGE__/components/ui/Separator'
${scriptEnd}

<template>
  <div class="grid w-full max-w-sm gap-4">
    <p>Account details</p>
    <Separator color="${color.value}" />
    <p>Preferences</p>
  </div>
</template>`,
)

function reset() {
  colorChoice.value = separatorDefaults.color
  customColor.value = '#8b5cf6'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme token or custom CSS color."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="colorChoice" label="Color" :options="colors" />
        <ExampleColorControl
          v-if="colorChoice === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
      </div>
    </template>
    <div class="grid w-full max-w-sm gap-4">
      <p>Account details</p>
      <Separator :color="color" />
      <p>Preferences</p>
    </div>
  </ComponentExample>
</template>
