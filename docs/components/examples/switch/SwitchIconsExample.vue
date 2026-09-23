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
  <div class="flex w-full max-w-sm items-center justify-between gap-4">
    <Label for="switch-icons">Alerts</Label>
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
    title="Icons"
    description="Use uncheckedIcon and checkedIcon to change the icon based on the state."
    :code="code"
    :show-reset="false"
  >
    <div class="flex w-full max-w-sm items-center justify-between gap-4">
      <Label for="switch-icons">Alerts</Label>
      <Switch
        id="switch-icons"
        v-model:value="enabled"
        :unchecked-icon="{ name: 'x' }"
        :checked-icon="{ name: 'check' }"
      />
    </div>
  </ComponentExample>
</template>
