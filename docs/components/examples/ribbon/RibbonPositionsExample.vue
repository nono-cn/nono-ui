<script setup lang="ts">
import { Ribbon } from '@/components/ui/Ribbon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const ribbons = [
  { label: 'Top right', position: 'top-right' },
  { label: 'Top left', position: 'top-left' },
  { label: 'Bottom right', position: 'bottom-right' },
  { label: 'Bottom left', position: 'bottom-left' },
] as const

const code = `<script setup lang="ts">
import { Ribbon } from '__DOCS_PACKAGE__/components/ui/Ribbon'

const ribbons = [
  { label: 'Top right', position: 'top-right' },
  { label: 'Top left', position: 'top-left' },
  { label: 'Bottom right', position: 'bottom-right' },
  { label: 'Bottom left', position: 'bottom-left' },
]
${scriptEnd}

<template>
  <Ribbon :ribbons="ribbons" class="w-full max-w-md rounded-xl border p-16">
    <p class="text-center">Content with multiple positions</p>
  </Ribbon>
</template>`
</script>

<template>
  <ComponentExample
    title="Positions"
    description="Show the four available positions."
    :code="code"
    :show-reset="false"
  >
    <Ribbon :ribbons="ribbons" class="w-full max-w-md rounded-xl border p-16">
      <p class="text-center">Content with multiple positions</p>
    </Ribbon>
  </ComponentExample>
</template>
