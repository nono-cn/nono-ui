<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
${scriptEnd}

<template>
  <Avatar
    src="/avatar-that-does-not-exist.png"
    :delay-ms="600"
    label="NN"
    aria-label="Cuenta de Nono"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Delay"
    description="Cuando la imagen falla, el fallback aparece después del retraso configurado en milisegundos."
    :code="code"
    :show-reset="false"
  >
    <Avatar
      src="/avatar-that-does-not-exist.png"
      :delay-ms="600"
      label="NN"
      aria-label="Cuenta de Nono"
    />
  </ComponentExample>
</template>
