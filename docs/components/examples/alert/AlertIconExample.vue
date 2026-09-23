<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <Alert
    label="Sync complete"
    description="All changes are up to date."
    :icon="{ name: 'check' }"
    severity="success"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Display a leading icon using the icon prop."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Alert
        label="Sync complete"
        description="All changes are up to date."
        :icon="{ name: 'check' }"
        severity="success"
      />
    </div>
  </ComponentExample>
</template>
