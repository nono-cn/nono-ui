<script setup lang="ts">
import { computed, ref } from 'vue'
import { ProgressCircular } from '@/components/ui/ProgressCircular'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colors = [...themeColors, 'custom']
const choice = ref('secondary')
const customColor = ref('#d8b4fe')
const trackColor = computed(() => (choice.value === 'custom' ? customColor.value : choice.value))
const code = computed(
  () => `<script setup lang="ts">
import { ProgressCircular } from '__DOCS_PACKAGE__/components/ui/ProgressCircular'
${scriptEnd}

<template>
  <ProgressCircular :model-value="65" track-color="${trackColor.value}" aria-label="Upload progress" />
</template>`,
)

function reset() {
  choice.value = 'secondary'
  customColor.value = '#d8b4fe'
}
</script>

<template>
  <ComponentExample
    title="Track color"
    description="Set the track color independently from the indicator."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="choice" label="Track color" :options="colors" />
        <ExampleColorControl
          v-if="choice === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
      </div>
    </template>
    <ProgressCircular :model-value="65" :track-color="trackColor" aria-label="Upload progress" />
  </ComponentExample>
</template>
