<script setup lang="ts">
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const severities = ['primary', 'secondary', 'error', 'warning', 'success'] as const

const code = `<script setup lang="ts">
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Textarea } from '__DOCS_PACKAGE__/components/ui/Textarea'

const severities = ['primary', 'secondary', 'error', 'warning', 'success'] as const
${scriptEnd}

<template>
  <div class="grid w-full gap-4 sm:grid-cols-2">
    <div v-for="severity in severities" :key="severity" class="grid gap-2">
      <Label :for="'textarea-' + severity">{{ severity }}</Label>
      <Textarea :id="'textarea-' + severity" :severity="severity" size="sm" />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Focus a field to see its semantic focus color."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-4 sm:grid-cols-2">
      <div v-for="severity in severities" :key="severity" class="grid gap-2">
        <Label :for="'textarea-' + severity">{{ severity }}</Label>
        <Textarea :id="'textarea-' + severity" :severity="severity" size="sm" />
      </div>
    </div>
  </ComponentExample>
</template>
