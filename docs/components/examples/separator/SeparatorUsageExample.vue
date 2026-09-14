<script setup lang="ts">
import { Separator } from '@/components/ui/Separator'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Separator } from '@nono-cn/nono-ui/components/ui/Separator'
${scriptEnd}

<template>
  <div class="grid gap-3">
    <span class="text-sm">Cuenta</span>
    <Separator />
    <span class="text-sm text-muted-foreground">Preferencias</span>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Un separador horizontal con la orientación y semántica visual predeterminadas."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-md gap-3">
      <span class="text-sm">Cuenta</span>
      <Separator />
      <span class="text-sm text-muted-foreground">Preferencias</span>
    </div>
  </ComponentExample>
</template>
