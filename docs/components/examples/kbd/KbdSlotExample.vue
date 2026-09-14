<script setup lang="ts">
import { Kbd } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Kbd } from '@nono-cn/nono-ui/components/ui/Kbd'
${scriptEnd}

<template>
  <Kbd aria-label="Command K">
    <span aria-hidden="true">⌘</span>
    <span>K</span>
  </Kbd>
</template>`
</script>

<template>
  <ComponentExample
    title="Slot"
    description="Sustituye label con contenido personalizado cuando necesites combinar símbolos o texto."
    :code="code"
    :show-reset="false"
  >
    <Kbd aria-label="Command K">
      <span aria-hidden="true">⌘</span>
      <span>K</span>
    </Kbd>
  </ComponentExample>
</template>
