<script setup lang="ts">
import { MeterGroup, type MeterGroupItem } from '@/components/ui/MeterGroup'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: MeterGroupItem[] = [
  { label: 'Apps', value: 18 },
  { label: 'Photos', value: 24, color: 'success' },
  { label: 'Videos', value: 16, color: 'warning' },
]

function getValueLabel() {
  return 'Storage usage'
}

function getValueText(value: number | null | undefined, max: number) {
  return `${value ?? 0} GB of ${max} GB used`
}

const code = `<script setup lang="ts">
import { MeterGroup, type MeterGroupItem } from '__DOCS_PACKAGE__/components/ui/MeterGroup'

const items: MeterGroupItem[] = [
  { label: 'Apps', value: 18 },
  { label: 'Photos', value: 24, color: 'success' },
  { label: 'Videos', value: 16, color: 'warning' },
]

function getValueLabel() {
  return 'Storage usage'
}

function getValueText(value: number | null | undefined, max: number) {
  return \`\${value ?? 0} GB of \${max} GB used\`
}
${scriptEnd}

<template>
  <MeterGroup
    :items="items"
    :get-value-label="getValueLabel"
    :get-value-text="getValueText"
    class="w-full max-w-md"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Accessible value"
    description="Provide a spoken name and value for the meter."
    :code="code"
    :show-reset="false"
  >
    <MeterGroup
      :items="items"
      :get-value-label="getValueLabel"
      :get-value-text="getValueText"
      class="w-full max-w-md"
    />
  </ComponentExample>
</template>
