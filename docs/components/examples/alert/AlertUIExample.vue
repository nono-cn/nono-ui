<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const ui = {
  label: () => ({ class: 'uppercase tracking-wider' }),
  description: () => ({ class: 'text-current/70' }),
  closeButtonContainer: () => ({ class: 'top-3 right-3' }),
}

const code = `<script setup lang="ts">
import { Alert } from '@nono-cn/nono-ui/components/ui/Alert'

const ui = {
  label: () => ({ class: 'uppercase tracking-wider' }),
  description: () => ({ class: 'text-current/70' }),
  closeButtonContainer: () => ({ class: 'top-3 right-3' }),
}
${scriptEnd}

<template>
  <Alert
    label="Personalizado"
    description="Las partes internas reciben atributos y clases adicionales."
    closable
    :ui="ui"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="UI"
    description="Usa resolvers para personalizar label, description y el contenedor del cierre."
    :code="code"
    :show-reset="false"
  >
    <Alert
      label="Personalizado"
      description="Las partes internas reciben atributos y clases adicionales."
      closable
      :ui="ui"
    />
  </ComponentExample>
</template>
