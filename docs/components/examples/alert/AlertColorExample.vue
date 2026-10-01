<script setup lang="ts">
import { computed, ref } from 'vue'
import { Alert, alertDefaults, alertVariantNames, type AlertVariant } from '@/components/ui/Alert'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colors = [...themeColors, 'custom']
const selectedColor = ref<string>(alertDefaults.color)
const customColor = ref('#7c3aed')
const color = computed(() =>
  selectedColor.value === 'custom' ? customColor.value : selectedColor.value,
)
const variant = ref<AlertVariant>(alertDefaults.variant)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'

const color = ref('${color.value}')
const variant = ref('${variant.value}' as const)
${scriptEnd}

<template>
  <Alert
    label="System notice"
    description="Review this information about your account."
    icon="info"
    :closable="true"
    :color="color"
    :variant="variant"
  />
</template>`,
)

function reset() {
  selectedColor.value = alertDefaults.color
  customColor.value = '#7c3aed'
  variant.value = alertDefaults.variant
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
        <ExampleSelectControl v-model="variant" label="Variant" :options="alertVariantNames" />
      </div>
    </template>
    <div class="w-full max-w-2xl">
      <Alert
        label="System notice"
        description="Review this information about your account."
        icon="info"
        :closable="true"
        :color="color"
        :variant="variant"
      />
    </div>
  </ComponentExample>
</template>
