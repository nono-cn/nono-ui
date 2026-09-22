<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <Alert
    label="Tema personalizado"
    description="El color CSS reemplaza el color semántico del alert."
    color="#7c3aed"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="Aplica un color CSS personalizado al tratamiento visual."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Alert
        label="Tema personalizado"
        description="El color CSS reemplaza el color semántico del alert."
        color="#7c3aed"
      />
    </div>
  </ComponentExample>
</template>
