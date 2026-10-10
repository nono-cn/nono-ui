<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating, ratingDefaults } from '@/components/ui/Rating'
import { themeColors } from '@/components/ui/constants'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colors = [...themeColors, 'custom']
const choice = ref<string>(ratingDefaults.color)
const customColor = ref('#8b5cf6')
const color = computed(() => (choice.value === 'custom' ? customColor.value : choice.value))
const code = computed(
  () => `<script setup lang="ts">
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'
${scriptEnd}

<template>
  <Rating :model-value="3" color="${color.value}" aria-label="Product rating" />
</template>`,
)

function reset() {
  choice.value = ratingDefaults.color
  customColor.value = '#8b5cf6'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme color or a custom CSS color."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="choice" label="Color" :options="colors" />
        <ExampleColorControl
          v-if="choice === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
      </div>
    </template>
    <Rating :model-value="3" :color="color" aria-label="Product rating" />
  </ComponentExample>
</template>
