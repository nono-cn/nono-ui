<script setup lang="ts">
import { computed, ref } from 'vue'
import { Kbd, kbdDefaults, kbdVariantNames, type KbdVariant } from '@/components/ui/Kbd'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colors = [...themeColors, 'custom']
const selectedColor = ref<string>(kbdDefaults.color)
const customColor = ref('#6366f1')
const color = computed(() =>
  selectedColor.value === 'custom' ? customColor.value : selectedColor.value,
)
const variant = ref<KbdVariant>(kbdDefaults.variant)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Kbd, type KbdVariant } from '__DOCS_PACKAGE__/components/ui/Kbd'

const color = ref('${color.value}')
const variant = ref<KbdVariant>('${variant.value}')
${scriptEnd}

<template>
  <Kbd label="Ctrl" :color="color" :variant="variant" />
</template>`,
)

function reset() {
  selectedColor.value = kbdDefaults.color
  customColor.value = '#6366f1'
  variant.value = kbdDefaults.variant
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme token or custom color, then select a visual style."
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
        <ExampleSelectControl v-model="variant" label="Variant" :options="kbdVariantNames" />
      </div>
    </template>
    <Kbd label="Ctrl" :color="color" :variant="variant" />
  </ComponentExample>
</template>
