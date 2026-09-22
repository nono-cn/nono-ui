<script setup lang="ts">
import { AspectRatio } from '@/components/ui/AspectRatio'
import ComponentExample from '../ComponentExample.vue'

const ratios = [
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
]

const code = `<script setup lang="ts">
import { AspectRatio } from '@nono-cn/nono-ui/components/ui/AspectRatio'

const ratios = [
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
]
<\/script>

<template>
  <div class="grid w-full gap-4 sm:grid-cols-3">
    <div v-for="ratio in ratios" :key="ratio.label" class="grid gap-2">
      <AspectRatio :ratio="ratio.value" class="overflow-hidden rounded-lg border">
        <div class="grid size-full place-items-center bg-muted/40">{{ ratio.label }}</div>
      </AspectRatio>
      <span class="text-center text-sm text-muted-foreground">{{ ratio.label }}</span>
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Diferentes proporciones"
    description="Elige el ratio según el contenido visual."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-4 sm:grid-cols-3">
      <div v-for="ratio in ratios" :key="ratio.label" class="grid gap-2">
        <AspectRatio :ratio="ratio.value" class="overflow-hidden rounded-lg border">
          <div class="grid size-full place-items-center bg-muted/40">{{ ratio.label }}</div>
        </AspectRatio>
        <span class="text-center text-sm text-muted-foreground">{{ ratio.label }}</span>
      </div>
    </div>
  </ComponentExample>
</template>
