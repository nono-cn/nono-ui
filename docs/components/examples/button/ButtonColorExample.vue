<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button label="Indigo" color="#6366f1" />
    <Button label="Green" color="#22c55e" />
    <Button label="Orange" color="#f97316" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="Apply a custom CSS color to the button style."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Button label="Indigo" color="#6366f1" />
      <Button label="Green" color="#22c55e" />
      <Button label="Orange" color="#f97316" />
    </div>
  </ComponentExample>
</template>
