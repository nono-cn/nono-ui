<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <div class="grid w-full max-w-2xl gap-3">
    <Alert label="Solid" description="Tratamiento sólido." variant="solid" severity="success" />
    <Alert label="Outline" description="Tratamiento con contorno." variant="outline" severity="success" />
    <Alert label="Plain" description="Tratamiento sin fondo ni contorno." variant="plain" severity="success" />
    <Alert label="Subtle" description="Tratamiento con contorno y fondo tenue." variant="subtle" severity="success" />
    <Alert label="Soft" description="Tratamiento con fondo tenue." variant="soft" severity="success" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Compara los cinco tratamientos visuales disponibles."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-2xl gap-3">
      <Alert label="Solid" description="Tratamiento sólido." variant="solid" severity="success" />
      <Alert
        label="Outline"
        description="Tratamiento con contorno."
        variant="outline"
        severity="success"
      />
      <Alert
        label="Plain"
        description="Tratamiento sin fondo ni contorno."
        variant="plain"
        severity="success"
      />
      <Alert
        label="Subtle"
        description="Tratamiento con contorno y fondo tenue."
        variant="subtle"
        severity="success"
      />
      <Alert
        label="Soft"
        description="Tratamiento con fondo tenue."
        variant="soft"
        severity="success"
      />
    </div>
  </ComponentExample>
</template>
