<script setup lang="ts">
import { Ribbon } from '@/components/ui/Ribbon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const ribbons = [
  { label: 'Success', severity: 'success', position: 'top-right' },
  { label: 'Custom', color: '#8b5cf6', position: 'bottom-left' },
] as const

const code = `<script setup lang="ts">
import { Ribbon } from '__DOCS_PACKAGE__/components/ui/Ribbon'

const ribbons = [
  { label: 'Success', severity: 'success', position: 'top-right' },
  { label: 'Custom', color: '#8b5cf6', position: 'bottom-left' },
]
${scriptEnd}

<template>
  <Ribbon :ribbons="ribbons" class="w-full max-w-md rounded-xl border p-16">
    <p class="text-center">Content with semantic styles</p>
  </Ribbon>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity and color"
    description="Combine severity with a custom color."
    :code="code"
    :show-reset="false"
  >
    <Ribbon :ribbons="ribbons" class="w-full max-w-md rounded-xl border p-16">
      <p class="text-center">Content with semantic styles</p>
    </Ribbon>
  </ComponentExample>
</template>
