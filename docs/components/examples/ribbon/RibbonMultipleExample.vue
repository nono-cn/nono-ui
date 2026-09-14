<script setup lang="ts">
import { Ribbon } from '@/components/ui/Ribbon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const ribbons = [
  { label: 'Nuevo', position: 'top-right' as const, severity: 'primary' as const },
  { label: 'Oferta', position: 'top-left' as const, severity: 'warning' as const },
  { label: 'Verificado', position: 'bottom-right' as const, severity: 'success' as const },
]

const code = `<script setup lang="ts">
import { Ribbon, type RibbonItem } from '@nono-cn/nono-ui/components/ui/Ribbon'

const ribbons: RibbonItem[] = [
  { label: 'Nuevo', position: 'top-right', severity: 'primary' },
  { label: 'Oferta', position: 'top-left', severity: 'warning' },
  { label: 'Verificado', position: 'bottom-right', severity: 'success' },
]
${scriptEnd}

<template>
  <Ribbon
    :ribbons="ribbons"
    class="h-52 w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground"
  >
    <div class="relative z-10 grid h-full place-items-center text-center">
      <p class="font-semibold">Varias cintas</p>
    </div>
  </Ribbon>
</template>`
</script>

<template>
  <ComponentExample
    title="Multiple ribbons"
    description="Combina varias cintas y configura cada una de forma independiente."
    :code="code"
    :show-reset="false"
  >
    <Ribbon
      :ribbons="ribbons"
      class="h-52 w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground"
    >
      <div class="relative z-10 grid h-full place-items-center text-center">
        <p class="font-semibold">Varias cintas</p>
      </div>
    </Ribbon>
  </ComponentExample>
</template>
