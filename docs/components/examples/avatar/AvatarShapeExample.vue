<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Avatar shape="rounded" label="RO" />
    <Avatar shape="square" label="SQ" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Shape"
    description="Elige entre una forma circular o cuadrada."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-4">
      <Avatar shape="rounded" label="RO" />
      <Avatar shape="square" label="SQ" />
    </div>
  </ComponentExample>
</template>
