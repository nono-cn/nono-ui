<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <div class="grid w-full max-w-2xl gap-3">
    <Alert label="Anuncio" description="Este alert usa role=alert por defecto." />
    <Alert
      label="Decorativo"
      description="Este contenido visual no se anuncia como una alerta."
      :decorative="true"
    />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Decorative"
    description="Usa decorative solo cuando el contenido sea puramente visual."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-2xl gap-3">
      <Alert label="Anuncio" description="Este alert usa role=alert por defecto." />
      <Alert
        label="Decorativo"
        description="Este contenido visual no se anuncia como una alerta."
        :decorative="true"
      />
    </div>
  </ComponentExample>
</template>
