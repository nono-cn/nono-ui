<script setup lang="ts">
import { Icon } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Icon } from '@nono-cn/nono-ui/components/ui/Icon'
${scriptEnd}

<template>
  <Icon name="check" />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Empieza indicando el nombre del icono que quieres renderizar."
    :code="code"
    :show-reset="false"
  >
    <Icon name="check" />
  </ComponentExample>
</template>
