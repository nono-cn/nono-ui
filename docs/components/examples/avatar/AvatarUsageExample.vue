<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
${scriptEnd}

<template>
  <Avatar
    class="text-primary"
    label="NC"
    alt="Avatar de Nono UI"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Muestra una imagen de perfil con un fallback textual."
    :code="code"
    :show-reset="false"
  >
    <Avatar class="text-primary" label="NC" alt="Avatar de Nono UI" />
  </ComponentExample>
</template>
