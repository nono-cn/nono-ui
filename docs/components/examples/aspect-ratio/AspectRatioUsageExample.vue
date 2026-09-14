<script setup lang="ts">
import { AspectRatio } from '@/components/ui/AspectRatio'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { AspectRatio } from '@nono-cn/nono-ui/components/ui/AspectRatio'
${scriptEnd}

<template>
  <AspectRatio
    :ratio="16 / 9"
    class="w-full max-w-xl overflow-hidden rounded-xl border bg-muted"
  >
    <div class="grid h-full w-full place-items-center bg-gradient-to-br from-primary/20 to-primary/5">
      <div class="text-center">
        <p class="text-2xl font-semibold tracking-tight">16:9</p>
        <p class="text-sm text-muted-foreground">Vista previa adaptable</p>
      </div>
    </div>
  </AspectRatio>
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Un contenedor 16:9 mantiene la proporción mientras cambia su ancho."
    :code="code"
    :show-reset="false"
  >
    <AspectRatio :ratio="16 / 9" class="w-full max-w-xl overflow-hidden rounded-xl border bg-muted">
      <div
        class="grid h-full w-full place-items-center bg-gradient-to-br from-primary/20 to-primary/5"
      >
        <div class="text-center">
          <p class="text-2xl font-semibold tracking-tight">16:9</p>
          <p class="text-sm text-muted-foreground">Vista previa adaptable</p>
        </div>
      </div>
    </AspectRatio>
  </ComponentExample>
</template>
