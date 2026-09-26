<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Avatar color="#fef3c7" severity="warning" label="WA" />
    <Avatar color="#dcfce7" severity="success" label="SU" />
    <Avatar color="#dbeafe" severity="primary" label="PR" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="Apply a custom background color while keeping the severity text and icon color."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-4">
      <Avatar color="#fef3c7" severity="warning" label="WA" />
      <Avatar color="#dcfce7" severity="success" label="SU" />
      <Avatar color="#dbeafe" severity="primary" label="PR" />
    </div>
  </ComponentExample>
</template>
