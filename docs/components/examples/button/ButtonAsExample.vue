<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button as="a" href="/docs" label="Enlace" />
    <Button as-child>
      <a href="/docs">Composición</a>
    </Button>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="As y asChild"
    description="Usa as para cambiar el elemento raíz o asChild para aplicar el botón a un elemento hijo."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Button as="a" href="/docs" label="Enlace" />
      <Button as-child>
        <a href="/docs">Composición</a>
      </Button>
    </div>
  </ComponentExample>
</template>
