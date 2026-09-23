<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref<'on' | 'off'>('off')

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Switch } from '__DOCS_PACKAGE__/components/ui/Switch'

const value = ref<'on' | 'off'>('off')
${scriptEnd}

<template>
  <div class="grid w-full max-w-sm gap-3">
    <div class="flex items-center justify-between gap-4">
      <Label for="switch-values">Notifications</Label>
      <Switch
        id="switch-values"
        v-model:value="value"
        true-value="on"
        false-value="off"
      />
    </div>
    <p class="text-sm text-muted-foreground">Current value: {{ value }}</p>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Custom values"
    description="Set trueValue and falseValue to use non-boolean values."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-sm gap-3">
      <div class="flex items-center justify-between gap-4">
        <Label for="switch-values">Notifications</Label>
        <Switch id="switch-values" v-model:value="value" true-value="on" false-value="off" />
      </div>
      <p class="text-sm text-muted-foreground">Current value: {{ value }}</p>
    </div>
  </ComponentExample>
</template>
