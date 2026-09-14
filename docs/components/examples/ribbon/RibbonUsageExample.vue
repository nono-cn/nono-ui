<script setup lang="ts">
import { Ribbon } from '@/components/ui/Ribbon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Ribbon } from '@nono-cn/nono-ui/components/ui/Ribbon'
${scriptEnd}

<template>
  <Ribbon
    :ribbons="[{ label: 'Nuevo', position: 'top-right' }]"
    class="h-44 w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground"
  >
    <div class="relative z-10 grid h-full place-items-center text-center">
      <div>
        <p class="font-semibold">Contenido destacado</p>
        <p class="mt-1 text-sm text-muted-foreground">El slot default queda por encima de la cinta.</p>
      </div>
    </div>
  </Ribbon>
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Una cinta decorativa sobre una tarjeta de contenido."
    :code="code"
    :show-reset="false"
  >
    <Ribbon
      :ribbons="[{ label: 'Nuevo', position: 'top-right' }]"
      class="h-44 w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground"
    >
      <div class="relative z-10 grid h-full place-items-center text-center">
        <div>
          <p class="font-semibold">Contenido destacado</p>
          <p class="mt-1 text-sm text-muted-foreground">
            El slot default queda por encima de la cinta.
          </p>
        </div>
      </div>
    </Ribbon>
  </ComponentExample>
</template>
