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
  <Switch
    v-model:value="enabled"
    :checked-icon="{ name: 'check' }"
    :unchecked-icon="{ name: 'x' }"
    aria-label="Estado"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Checked y unchecked icons"
    description="Muestra un icono distinto para cada estado cuando no se proporciona el slot thumb."
    :code="code"
    :show-reset="false"
  >
    <Switch
      v-model:value="enabled"
      :checked-icon="{ name: 'check' }"
      :unchecked-icon="{ name: 'x' }"
      aria-label="Estado"
    />
  </ComponentExample>
</template>
