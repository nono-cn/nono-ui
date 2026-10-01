<script setup lang="ts">
import { computed, ref } from 'vue'
import { AspectRatio, aspectRatioDefaults } from '@/components/ui/AspectRatio'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type RatioPreset = '1:1' | '4:3' | '16:9'

const ratioOptions: RatioPreset[] = ['1:1', '4:3', '16:9']
const selectedPreset = ref<RatioPreset>('16:9')
const ratioValues: Record<RatioPreset, number> = {
  '1:1': aspectRatioDefaults.ratio,
  '4:3': 4 / 3,
  '16:9': 16 / 9,
}
const ratio = computed(() => ratioValues[selectedPreset.value])
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { AspectRatio } from '__DOCS_PACKAGE__/components/ui/AspectRatio'

const ratio = ref(${selectedPreset.value.replace(':', ' / ')})
${scriptEnd}

<template>
  <AspectRatio :ratio="ratio" class="max-w-lg overflow-hidden rounded-lg border">
    <div class="grid size-full place-items-center bg-muted/40">Content</div>
  </AspectRatio>
</template>`,
)

function reset() {
  selectedPreset.value = '16:9'
}
</script>

<template>
  <ComponentExample
    title="Aspect ratio"
    description="Choose a common ratio and see how it shapes the content area."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="selectedPreset" label="Ratio" :options="ratioOptions" />
      </div>
    </template>
    <div class="w-full max-w-lg">
      <AspectRatio :ratio="ratio" class="overflow-hidden rounded-lg border">
        <div class="grid size-full place-items-center bg-muted/40">
          {{ selectedPreset }} content
        </div>
      </AspectRatio>
    </div>
  </ComponentExample>
</template>
