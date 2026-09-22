<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <Alert
    label="Conexión inestable"
    description="El botón de cierre hereda la apariencia del alert salvo que la configures."
    severity="warning"
    :closable="true"
    :close-button="{ size: 'sm', variant: 'outline', severity: 'secondary' }"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="CloseButton"
    description="Personaliza el tamaño, la variante y la severidad del botón de cierre."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Alert
        label="Conexión inestable"
        description="El botón de cierre hereda la apariencia del alert salvo que la configures."
        severity="warning"
        :closable="true"
        :close-button="{ size: 'sm', variant: 'outline', severity: 'secondary' }"
      />
    </div>
  </ComponentExample>
</template>
