<script setup lang="ts">
import { computed, ref } from 'vue'
import { Alert, alertDefaults, alertVariantNames, type AlertVariant } from '@/components/ui/Alert'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variant = ref<AlertVariant>(alertDefaults.variant)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'

const variant = ref('${variant.value}' as const)
${scriptEnd}

<template>
  <Alert
    label="Account update"
    description="Your account settings were updated successfully."
    :variant="variant"
  />
</template>`,
)

function reset() {
  variant.value = alertDefaults.variant
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Choose the alert’s visual style."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="alertVariantNames" />
      </div>
    </template>
    <div class="w-full max-w-2xl">
      <Alert
        label="Account update"
        description="Your account settings were updated successfully."
        :variant="variant"
      />
    </div>
  </ComponentExample>
</template>
