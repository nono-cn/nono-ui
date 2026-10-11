<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'
${scriptEnd}

<template>
  <Progress :model-value="65" size="md" aria-label="Upload progress">
    <template #indicator="{ percentage }">Upload: {{ Math.round(percentage) }}%</template>
  </Progress>
</template>`
</script>

<template>
  <ComponentExample
    title="Slot indicator"
    description="Show content above the track at any size."
    :code="code"
  >
    <div class="w-full max-w-md">
      <Progress :model-value="65" size="md" aria-label="Upload progress">
        <template #indicator="{ percentage }">Upload: {{ Math.round(percentage) }}%</template>
      </Progress>
    </div>
  </ComponentExample>
</template>
