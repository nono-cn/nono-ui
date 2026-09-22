<script setup lang="ts">
import { Icon } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Icon } from '@nono-cn/nono-ui/components/ui/Icon'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-end gap-5">
    <Icon name="check" size="xs" />
    <Icon name="check" size="sm" />
    <Icon name="check" size="md" />
    <Icon name="check" size="lg" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Size"
    description="Ajusta el tamaño visual del icono."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-end gap-5">
      <Icon name="check" size="xs" />
      <Icon name="check" size="sm" />
      <Icon name="check" size="md" />
      <Icon name="check" size="lg" />
    </div>
  </ComponentExample>
</template>
