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
  <Switch v-model:value="enabled" color="#8b5cf6" aria-label="Color" />
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="Aplica un color CSS personalizado."
    :code="code"
    :show-reset="false"
  >
    <Switch v-model:value="enabled" color="#8b5cf6" aria-label="Color" />
  </ComponentExample>
</template>
