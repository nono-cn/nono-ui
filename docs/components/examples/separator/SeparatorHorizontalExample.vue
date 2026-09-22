<script setup lang="ts">
import { Separator } from '@/components/ui/Separator'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Separator } from '__DOCS_PACKAGE__/components/ui/Separator'
<\/script>

<template>
  <div class="grid w-full max-w-lg gap-4">
    <section class="grid gap-1">
      <h3 class="font-medium">Perfil</h3>
      <p class="text-sm text-muted-foreground">Gestiona tu información personal.</p>
    </section>
    <Separator />
    <section class="grid gap-1">
      <h3 class="font-medium">Privacidad</h3>
      <p class="text-sm text-muted-foreground">Controla quién puede ver tu perfil.</p>
    </section>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Separa secciones de contenido con la orientación horizontal predeterminada."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-4">
      <section class="grid gap-1">
        <h3 class="font-medium">Perfil</h3>
        <p class="text-sm text-muted-foreground">Gestiona tu información personal.</p>
      </section>
      <Separator />
      <section class="grid gap-1">
        <h3 class="font-medium">Privacidad</h3>
        <p class="text-sm text-muted-foreground">Controla quién puede ver tu perfil.</p>
      </section>
    </div>
  </ComponentExample>
</template>
