<script setup lang="ts">
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const code = `<script setup lang="ts">
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
${scriptEnd}
<template>
  <Checkbox
    v-for="size in sizes"
    :key="size"
    :size="size"
    :value="true"
    :aria-label="size"
  />
</template>`
</script>
<template>
  <ComponentExample
    title="Size"
    description="Compare the available sizes."
    :code="code"
    :show-reset="false"
    ><div class="flex items-center gap-4">
      <Checkbox
        v-for="size in sizes"
        :key="size"
        :size="size"
        :value="true"
        :aria-label="size"
      /></div
  ></ComponentExample>
</template>
