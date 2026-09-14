<script setup lang="ts">
import { Kbd } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Kbd } from '@nono-cn/nono-ui/components/ui/Kbd'
${scriptEnd}

<template>
  <div class="grid gap-2">
    <span id="kbd-search-help" class="text-sm">Abre el buscador</span>
    <Kbd aria-label="Control K">Ctrl K</Kbd>
    <span class="text-xs text-muted-foreground">El atajo conserva su texto visible y un nombre accesible.</span>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Contenido accesible"
    description="Usa texto visible para el atajo y aria-label cuando la forma abreviada necesite una pronunciación más clara."
    :code="code"
    :show-reset="false"
  >
    <div class="grid gap-2">
      <span id="kbd-search-help" class="text-sm">Abre el buscador</span>
      <Kbd aria-label="Control K">Ctrl K</Kbd>
      <span class="text-xs text-muted-foreground">
        El atajo conserva su texto visible y un nombre accesible.
      </span>
    </div>
  </ComponentExample>
</template>
