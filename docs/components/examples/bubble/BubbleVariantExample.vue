<script setup lang="ts">
import { Bubble } from '@/components/ui/Bubble'
import ComponentExample from '../ComponentExample.vue'

const variants = ['solid', 'outline', 'plain', 'subtle', 'soft', 'muted'] as const
const code = `<script setup lang="ts">
import { Bubble } from '__DOCS_PACKAGE__/components/ui/Bubble'

const variants = ['solid', 'outline', 'plain', 'subtle', 'soft', 'muted'] as const
<\/script>

<template>
  <div class="grid w-full gap-3">
    <Bubble v-for="variant in variants" :key="variant" :variant="variant">{{ variant }}</Bubble>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Compara los tratamientos visuales disponibles."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-3">
      <Bubble v-for="variant in variants" :key="variant" :variant="variant">{{ variant }}</Bubble>
    </div>
  </ComponentExample>
</template>
