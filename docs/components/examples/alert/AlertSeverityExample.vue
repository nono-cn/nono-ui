<script setup lang="ts">
import { computed, ref } from 'vue'
import { Alert, type AlertSeverity, type AlertVariant } from '@/components/ui/Alert'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const severities: AlertSeverity[] = [
  'primary',
  'secondary',
  'neutral',
  'warning',
  'success',
  'error',
]
const variants: AlertVariant[] = ['solid', 'outline', 'plain', 'subtle', 'soft']
const severity = ref<AlertSeverity>('primary')
const variant = ref<AlertVariant>('soft')

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'

const severity = ref('${severity.value}' as const)
const variant = ref('${variant.value}' as const)
${scriptEnd}

<template>
  <Alert
    label="System notice"
    description="Review this information about your account."
    :severity="severity"
    :variant="variant"
  />
</template>`,
)

function reset() {
  severity.value = 'primary'
  variant.value = 'soft'
}
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Choose the alert’s semantic color and visual style."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="severity" label="Severity" :options="severities" />
        <ExampleSelectControl v-model="variant" label="Variant" :options="variants" />
      </div>
    </template>
    <div class="w-full max-w-2xl">
      <Alert
        label="System notice"
        description="Review this information about your account."
        :severity="severity"
        :variant="variant"
      />
    </div>
  </ComponentExample>
</template>
