<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge, badgeDefaults, badgeVariantNames, type BadgeVariant } from '@/components/ui/Badge'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colors = [...themeColors, 'custom']
const selectedColor = ref<string>(badgeDefaults.color)
const customColor = ref('#6366f1')
const color = computed(() =>
  selectedColor.value === 'custom' ? customColor.value : selectedColor.value,
)
const variant = ref<BadgeVariant>(badgeDefaults.variant)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Badge, type BadgeVariant } from '__DOCS_PACKAGE__/components/ui/Badge'

const color = ref('${color.value}')
const variant = ref<BadgeVariant>('${variant.value}')
${scriptEnd}

<template>
  <Badge label="Notice" :color="color" :variant="variant" />
</template>`,
)

function reset() {
  selectedColor.value = badgeDefaults.color
  customColor.value = '#6366f1'
  variant.value = badgeDefaults.variant
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
        <ExampleSelectControl v-model="variant" label="Variant" :options="badgeVariantNames" />
      </div>
    </template>
    <Badge label="Notice" :color="color" :variant="variant" />
  </ComponentExample>
</template>
