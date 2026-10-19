<script setup lang="ts">
import { computed, ref } from 'vue'
import { Card } from '@/components/ui/Card'
import { Ribbon, ribbonItemDefaults } from '@/components/ui/Ribbon'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const choice = ref<string>(ribbonItemDefaults.color)
const customColor = ref('#8b5cf6')
const color = computed(() => (choice.value === 'custom' ? customColor.value : choice.value))
const ribbons = computed(() => [{ label: 'Sale', color: color.value }])
const code = computed(
  () => `<script setup lang="ts">
import { Card } from '__DOCS_PACKAGE__/components/ui/Card'
import { Ribbon } from '__DOCS_PACKAGE__/components/ui/Ribbon'

const ribbons = [{ label: 'Sale', color: '${color.value}' }]
${scriptEnd}

<template>
  <Ribbon :ribbons="ribbons" class="w-72 rounded-xl">
    <Card label="Summer collection" description="Lightweight pieces for warm days." class="min-h-48">
      <p class="text-2xl font-semibold">From $19</p>
    </Card>
  </Ribbon>
</template>`,
)

function reset() {
  choice.value = ribbonItemDefaults.color
  customColor.value = '#8b5cf6'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme color or custom CSS color for each ribbon."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="choice"
          label="Color"
          :options="[...themeColors, 'custom']"
        />
        <ExampleColorControl
          v-if="choice === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
      </div>
    </template>
    <Ribbon :ribbons="ribbons" class="w-72 rounded-xl">
      <Card
        label="Summer collection"
        description="Lightweight pieces for warm days."
        class="min-h-48"
      >
        <p class="text-2xl font-semibold">From $19</p>
      </Card>
    </Ribbon>
  </ComponentExample>
</template>
