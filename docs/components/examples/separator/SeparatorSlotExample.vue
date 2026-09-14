<script setup lang="ts">
import { Separator } from '@/components/ui/Separator'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Separator } from '@nono-cn/nono-ui/components/ui/Separator'
${scriptEnd}

<template>
  <Separator class="relative flex items-center justify-center">
    <span class="bg-background px-2 text-xs text-muted-foreground">o</span>
  </Separator>
</template>`
</script>

<template>
  <ComponentExample
    title="Slot"
    description="Usa el slot default para colocar una etiqueta visual sobre la línea."
    :code="code"
    :show-reset="false"
  >
    <Separator class="relative flex w-full max-w-md items-center justify-center">
      <span class="bg-background px-2 text-xs text-muted-foreground">o</span>
    </Separator>
  </ComponentExample>
</template>
