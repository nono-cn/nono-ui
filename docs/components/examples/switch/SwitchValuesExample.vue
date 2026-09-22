<script setup lang="ts">
/* eslint-disable no-useless-escape -- The copyable snippet contains escaped SFC tags. */
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import ComponentExample from '../ComponentExample.vue'

const value = ref<'on' | 'off'>('off')

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Switch } from '__DOCS_PACKAGE__/components/ui/Switch'

const value = ref<'on' | 'off'>('off')
<\/script>

<template>
  <div class="grid w-full max-w-sm gap-3">
    <div class="flex items-center justify-between gap-4">
      <Label for="switch-values">Notificaciones</Label>
      <Switch
        id="switch-values"
        v-model:value="value"
        true-value="on"
        false-value="off"
      />
    </div>
    <p class="text-sm text-muted-foreground">Valor actual: {{ value }}</p>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Valores personalizados"
    description="Configura trueValue y falseValue para usar valores distintos de booleanos."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-sm gap-3">
      <div class="flex items-center justify-between gap-4">
        <Label for="switch-values">Notificaciones</Label>
        <Switch id="switch-values" v-model:value="value" true-value="on" false-value="off" />
      </div>
      <p class="text-sm text-muted-foreground">Valor actual: {{ value }}</p>
    </div>
  </ComponentExample>
</template>
