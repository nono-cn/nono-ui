<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@/components/ui/Switch'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const enabled = ref(true)
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@nono-cn/nono-ui/components/ui/Switch'

const enabled = ref(true)
${scriptEnd}

<template>
  <Switch v-model:value="enabled" aria-label="Modo compacto">
    <template #thumb="{ state }"><span>{{ state ? '✓' : '' }}</span></template>
  </Switch>
</template>`
</script>

<template>
  <ComponentExample
    title="Thumb personalizado"
    description="El slot thumb recibe state y personaliza su contenido."
    :code="code"
    :show-reset="false"
  >
    <Switch v-model:value="enabled" aria-label="Modo compacto">
      <template #thumb="{ state }">
        <span>{{ state ? '✓' : '' }}</span>
      </template>
    </Switch>
  </ComponentExample>
</template>
