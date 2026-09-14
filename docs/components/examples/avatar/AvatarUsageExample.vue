<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
${scriptEnd}

<template>
  <Avatar label="CN" aria-label="Cuenta de Nono" />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Un avatar con el tamaño y la forma predeterminados que muestra iniciales como fallback."
    :code="code"
    :show-reset="false"
  >
    <Avatar label="CN" aria-label="Cuenta de Nono" />
  </ComponentExample>
</template>
