<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <div class="grid w-full max-w-2xl gap-3">
    <Alert label="Primary" description="Información principal." severity="primary" />
    <Alert label="Secondary" description="Información secundaria." severity="secondary" />
    <Alert label="Warning" description="Revisa este aviso." severity="warning" />
    <Alert label="Success" description="La operación se completó." severity="success" />
    <Alert label="Error" description="No se pudo completar la operación." severity="error" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Compara los colores semánticos disponibles."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-2xl gap-3">
      <Alert label="Primary" description="Información principal." severity="primary" />
      <Alert label="Secondary" description="Información secundaria." severity="secondary" />
      <Alert label="Warning" description="Revisa este aviso." severity="warning" />
      <Alert label="Success" description="La operación se completó." severity="success" />
      <Alert label="Error" description="No se pudo completar la operación." severity="error" />
    </div>
  </ComponentExample>
</template>
