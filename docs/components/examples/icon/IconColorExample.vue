<script setup lang="ts">
import { Icon } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Icon } from '__DOCS_PACKAGE__/components/ui/Icon'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-5">
    <Icon name="check" color="#6366f1" />
    <Icon name="check" color="#22c55e" />
    <Icon name="check" color="#f97316" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="Apply a custom CSS color to the icon."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-5">
      <Icon name="check" color="#6366f1" />
      <Icon name="check" color="#22c55e" />
      <Icon name="check" color="#f97316" />
    </div>
  </ComponentExample>
</template>
