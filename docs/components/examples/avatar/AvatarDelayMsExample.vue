<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
${scriptEnd}

<template>
  <Avatar
    src="/missing-avatar.png"
    :delay-ms="300"
    label="NC"
    alt="Perfil de ejemplo"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="DelayMs"
    description="Retrasa la aparición del contenido alternativo cuando la imagen no está disponible."
    :code="code"
    :show-reset="false"
  >
    <Avatar src="/missing-avatar.png" :delay-ms="300" label="NC" alt="Perfil de ejemplo" />
  </ComponentExample>
</template>
