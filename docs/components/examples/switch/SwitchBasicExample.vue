<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const enabled = ref(false)

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Switch } from '__DOCS_PACKAGE__/components/ui/Switch'

const enabled = ref(false)
${scriptEnd}

<template>
  <div class="flex w-full max-w-sm items-center justify-between gap-4 rounded-lg border p-4">
    <Label for="updates-switch">Receive updates</Label>
    <Switch id="updates-switch" v-model:value="enabled" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Associate the control with a label and bind its state with v-model:value."
    :code="code"
    :show-reset="false"
  >
    <div class="flex w-full max-w-sm items-center justify-between gap-4 rounded-lg border p-4">
      <Label for="updates-switch">Receive updates</Label>
      <Switch id="updates-switch" v-model:value="enabled" />
    </div>
  </ComponentExample>
</template>
