<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const enabled = ref(true)

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Switch } from '__DOCS_PACKAGE__/components/ui/Switch'

const enabled = ref(true)
${scriptEnd}

<template>
  <div class="flex w-full max-w-sm items-center justify-between gap-4">
    <Label for="switch-custom-color">Violet mode</Label>
    <Switch
      id="switch-custom-color"
      v-model:value="enabled"
      color="#8b5cf6"
      severity="secondary"
    />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Custom color"
    description="The color prop applies a CSS color and takes precedence over severity."
    :code="code"
    :show-reset="false"
  >
    <div class="flex w-full max-w-sm items-center justify-between gap-4">
      <Label for="switch-custom-color">Violet mode</Label>
      <Switch
        id="switch-custom-color"
        v-model:value="enabled"
        color="#8b5cf6"
        severity="secondary"
      />
    </div>
  </ComponentExample>
</template>
