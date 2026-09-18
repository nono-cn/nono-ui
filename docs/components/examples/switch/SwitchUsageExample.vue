<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@/components/ui/Switch'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const enabled = ref(false)
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@nono-cn/nono-ui/components/ui/Switch'

const enabled = ref(false)
${scriptEnd}

<template>
  <Switch v-model:value="enabled" aria-label="Activar notificaciones" />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Controla un valor booleano con v-model:value."
    :code="code"
    :show-reset="false"
  >
    <Switch v-model:value="enabled" aria-label="Activar notificaciones" />
  </ComponentExample>
</template>
