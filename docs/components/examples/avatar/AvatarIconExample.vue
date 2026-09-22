<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
${scriptEnd}

<template>
  <Avatar :icon="{ name: 'user' }" />
</template>`
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Muestra un icono en el fallback del avatar."
    :code="code"
    :show-reset="false"
  >
    <Avatar :icon="{ name: 'user' }" />
  </ComponentExample>
</template>
