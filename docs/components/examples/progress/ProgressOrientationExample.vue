<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Progress } from '@nono-cn/nono-ui/components/ui/Progress'
${scriptEnd}

<template>
  <Progress :value="65" orientation="horizontal" />
  <Progress :value="65" orientation="vertical" />
</template>`
</script>
<template>
  <ComponentExample
    title="Orientation"
    description="Muestra la barra en orientación horizontal o vertical."
    :code="code"
  >
    <div class="flex h-48 w-full flex-col items-center justify-center gap-8">
      <Progress class="w-full max-w-md" :value="65" orientation="horizontal" />
      <Progress class="h-32" :value="65" orientation="vertical" />
    </div>
  </ComponentExample>
</template>
