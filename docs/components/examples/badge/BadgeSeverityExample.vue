<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge, type BadgeSeverity, type BadgeVariant } from '@/components/ui/Badge'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const severities: BadgeSeverity[] = [
  'primary',
  'neutral',
  'secondary',
  'warning',
  'success',
  'error',
]
const variants: BadgeVariant[] = ['solid', 'outline', 'plain', 'subtle', 'soft']
const severity = ref<BadgeSeverity>('primary')
const variant = ref<BadgeVariant>('solid')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Badge, type BadgeSeverity, type BadgeVariant } from '__DOCS_PACKAGE__/components/ui/Badge'

const severity = ref<BadgeSeverity>('${severity.value}')
const variant = ref<BadgeVariant>('${variant.value}')
${scriptEnd}

<template>
  <Badge label="Notice" :severity="severity" :variant="variant" />
</template>`,
)

function reset() {
  severity.value = 'primary'
  variant.value = 'solid'
}
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Choose the semantic color and visual style of the badge."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="severity" label="Severity" :options="severities" />
        <ExampleSelectControl v-model="variant" label="Variant" :options="variants" />
      </div>
    </template>
    <Badge label="Notice" :severity="severity" :variant="variant" />
  </ComponentExample>
</template>
