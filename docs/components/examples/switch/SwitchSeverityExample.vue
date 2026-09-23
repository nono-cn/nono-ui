<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const severities = ['primary', 'secondary', 'warning', 'success', 'error'] as const
const values = ref([true, true, true, true, true])

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Switch } from '__DOCS_PACKAGE__/components/ui/Switch'

const severities = ['primary', 'secondary', 'warning', 'success', 'error'] as const
const values = ref([true, true, true, true, true])
${scriptEnd}

<template>
  <div class="grid w-full max-w-sm gap-3">
    <div
      v-for="(severity, index) in severities"
      :key="severity"
      class="flex items-center justify-between gap-4"
    >
      <Label :for="\`switch-severity-\${severity}\`">{{ severity }}</Label>
      <Switch
        :id="\`switch-severity-\${severity}\`"
        v-model:value="values[index]"
        :severity="severity"
      />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Choose a semantic color for the on state."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-sm gap-3">
      <div
        v-for="(severity, index) in severities"
        :key="severity"
        class="flex items-center justify-between gap-4"
      >
        <Label :for="`switch-severity-${severity}`">{{ severity }}</Label>
        <Switch
          :id="`switch-severity-${severity}`"
          v-model:value="values[index]"
          :severity="severity"
        />
      </div>
    </div>
  </ComponentExample>
</template>
