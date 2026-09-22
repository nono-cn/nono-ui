<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Avatar size="xs" label="XS" />
    <Avatar size="sm" label="SM" />
    <Avatar size="md" label="MD" />
    <Avatar size="lg" label="LG" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Size"
    description="Ajusta el tamaño visual del avatar."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-4">
      <Avatar size="xs" label="XS" />
      <Avatar size="sm" label="SM" />
      <Avatar size="md" label="MD" />
      <Avatar size="lg" label="LG" />
    </div>
  </ComponentExample>
</template>
