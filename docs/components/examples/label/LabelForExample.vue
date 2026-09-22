<script setup lang="ts">
import { Label } from '@/components/ui/Label'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
${scriptEnd}

<template>
  <div class="flex items-center gap-2">
    <input id="updates" type="checkbox" />
    <Label for="updates">Recibir actualizaciones</Label>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="For"
    description="Usa el mismo id del control en for para mantener la asociación accesible."
    :code="code"
    :show-reset="false"
  >
    <div class="flex items-center gap-2">
      <input id="updates" type="checkbox" />
      <Label for="updates">Recibir actualizaciones</Label>
    </div>
  </ComponentExample>
</template>
