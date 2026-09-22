<script setup lang="ts">
import { AspectRatio } from '@/components/ui/AspectRatio'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { AspectRatio } from '@nono-cn/nono-ui/components/ui/AspectRatio'
<\/script>

<template>
  <AspectRatio :ratio="16 / 9" class="max-w-xl overflow-hidden rounded-lg border">
    <div class="grid size-full place-items-center bg-slate-900 text-slate-100">
      <span aria-label="Vista previa de vídeo">Vista previa de vídeo</span>
    </div>
  </AspectRatio>
</template>`
</script>

<template>
  <ComponentExample
    title="Formato panorámico"
    description="La proporción 16:9 es habitual en vídeos."
    :code="code"
    :show-reset="false"
  >
    <AspectRatio :ratio="16 / 9" class="w-full max-w-xl overflow-hidden rounded-lg border">
      <div class="grid size-full place-items-center bg-slate-900 text-slate-100">
        <span aria-label="Vista previa de vídeo">Vista previa de vídeo</span>
      </div>
    </AspectRatio>
  </ComponentExample>
</template>
