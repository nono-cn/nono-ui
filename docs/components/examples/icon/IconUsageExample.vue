<script setup lang="ts">
import { Icon } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Icon } from '@nono-cn/nono-ui/components/ui/Icon'
${scriptEnd}

<template>
  <Icon name="search" size="md" />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Un icono de búsqueda con su tamaño por defecto."
    :code="code"
    :show-reset="false"
  >
    <Icon name="search" size="md" aria-hidden="true" />
  </ComponentExample>
</template>
