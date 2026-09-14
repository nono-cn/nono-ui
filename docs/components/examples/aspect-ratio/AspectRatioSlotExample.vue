<script setup lang="ts">
import { Icon } from '@/components/ui/Icon'
import { AspectRatio } from '@/components/ui/AspectRatio'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Icon } from '@nono-cn/nono-ui/components/ui/Icon'
import { AspectRatio } from '@nono-cn/nono-ui/components/ui/AspectRatio'
${scriptEnd}

<template>
  <AspectRatio :ratio="4 / 3" class="w-full max-w-xl overflow-hidden rounded-xl border bg-muted">
    <div class="relative h-full w-full bg-gradient-to-br from-secondary/30 to-muted p-6">
      <div class="absolute inset-0 grid place-items-center" aria-hidden="true">
        <Icon name="image" size="lg" />
      </div>
      <div class="absolute right-4 bottom-4 left-4 flex items-center justify-between">
        <span class="rounded-md bg-background/80 px-2 py-1 text-xs font-medium">captura.png</span>
        <span class="rounded-md bg-background/80 px-2 py-1 text-xs">4:3</span>
      </div>
    </div>
  </AspectRatio>
</template>`
</script>

<template>
  <ComponentExample
    title="Slot"
    description="El contenido del slot puede ocupar el ratio completo y posicionar sus propios elementos."
    :code="code"
    :show-reset="false"
  >
    <AspectRatio :ratio="4 / 3" class="w-full max-w-xl overflow-hidden rounded-xl border bg-muted">
      <div class="relative h-full w-full bg-gradient-to-br from-secondary/30 to-muted p-6">
        <div class="absolute inset-0 grid place-items-center" aria-hidden="true">
          <Icon name="image" size="lg" />
        </div>
        <div class="absolute right-4 bottom-4 left-4 flex items-center justify-between">
          <span class="rounded-md bg-background/80 px-2 py-1 text-xs font-medium">captura.png</span>
          <span class="rounded-md bg-background/80 px-2 py-1 text-xs">4:3</span>
        </div>
      </div>
    </AspectRatio>
  </ComponentExample>
</template>
