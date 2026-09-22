<script setup lang="ts">
/* eslint-disable no-useless-escape -- The copyable snippet contains escaped SFC tags. */
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import ComponentExample from '../ComponentExample.vue'

const enabled = ref(false)

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Switch } from '__DOCS_PACKAGE__/components/ui/Switch'

const enabled = ref(false)
<\/script>

<template>
  <div class="flex w-full max-w-sm items-center justify-between gap-4">
    <Label for="switch-icons">Alertas</Label>
    <Switch
      id="switch-icons"
      v-model:value="enabled"
      :unchecked-icon="{ name: 'x' }"
      :checked-icon="{ name: 'check' }"
    />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Iconos"
    description="Usa uncheckedIcon y checkedIcon para cambiar el icono según el estado."
    :code="code"
    :show-reset="false"
  >
    <div class="flex w-full max-w-sm items-center justify-between gap-4">
      <Label for="switch-icons">Alertas</Label>
      <Switch
        id="switch-icons"
        v-model:value="enabled"
        :unchecked-icon="{ name: 'x' }"
        :checked-icon="{ name: 'check' }"
      />
    </div>
  </ComponentExample>
</template>
