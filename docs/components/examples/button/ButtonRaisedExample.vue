<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button label="Raised" raised />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Raised"
    description="Añade una sombra ligera para comunicar elevación visual."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Button label="Raised" raised />
    </div>
  </ComponentExample>
</template>
