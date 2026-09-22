<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
${scriptEnd}

<template>
  <Avatar
    src="https://i.pravatar.cc/150?img=3"
    label="NC"
    alt="Perfil de ejemplo"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Src"
    description="Carga la imagen de perfil desde una URL."
    :code="code"
    :show-reset="false"
  >
    <Avatar src="https://i.pravatar.cc/150?img=3" label="NC" alt="Perfil de ejemplo" />
  </ComponentExample>
</template>
