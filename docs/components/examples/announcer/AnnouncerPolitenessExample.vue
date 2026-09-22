<script setup lang="ts">
import { Announcer } from '@/components/ui/Announcer'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Announcer } from '__DOCS_PACKAGE__/components/ui/Announcer'
<\/script>

<template>
  <div class="grid gap-2">
    <Announcer message="Actualización informativa" politeness="polite" />
    <Announcer message="Aviso urgente" politeness="assertive" />
    <Announcer message="Sin anuncio" politeness="off" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Politeness"
    description="Compara polite, assertive y off."
    :code="code"
    :show-reset="false"
  >
    <div class="grid gap-2 text-sm text-muted-foreground">
      <Announcer message="Actualización informativa" politeness="polite" />
      <Announcer message="Aviso urgente" politeness="assertive" />
      <Announcer message="Sin anuncio" politeness="off" />
      <span>Los anuncios se mantienen ocultos visualmente.</span>
    </div>
  </ComponentExample>
</template>
