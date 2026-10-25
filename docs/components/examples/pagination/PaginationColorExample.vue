<script setup lang="ts">
import { computed, ref } from 'vue'
import { Pagination, paginationDefaults } from '@/components/ui/Pagination'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const page = ref(4)
const colors = [...themeColors, 'custom']
const activeColors = ['same', ...colors]
const selectedColor = ref<string>(paginationDefaults.color)
const selectedActiveColor = ref('same')
const customColor = ref('#8b5cf6')
const color = computed(() =>
  selectedColor.value === 'custom' ? customColor.value : selectedColor.value,
)
const activeColor = computed(() => {
  if (selectedActiveColor.value === 'same') return undefined
  return selectedActiveColor.value === 'custom' ? customColor.value : selectedActiveColor.value
})
const usesCustomColor = computed(
  () => selectedColor.value === 'custom' || selectedActiveColor.value === 'custom',
)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from '__DOCS_PACKAGE__/components/ui/Pagination'

const page = ref(${page.value})
${scriptEnd}

<template>
  <Pagination
    v-model:page="page"
    :total="100"
    color="${color.value}"${activeColor.value ? `\n    active-color="${activeColor.value}"` : ''}
  />
</template>`,
)

function reset() {
  page.value = 4
  selectedColor.value = paginationDefaults.color
  selectedActiveColor.value = 'same'
  customColor.value = '#8b5cf6'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme token or a custom CSS color for the buttons, and optionally another one for the current page."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="selectedColor" label="Color" :options="colors" />
        <ExampleSelectControl
          v-model="selectedActiveColor"
          label="Active color"
          :options="activeColors"
        />
        <ExampleColorControl v-if="usesCustomColor" v-model="customColor" label="Custom color" />
      </div>
    </template>
    <Pagination v-model:page="page" :total="100" :color="color" :active-color="activeColor" />
  </ComponentExample>
</template>
