<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { ButtonGroup } from '__DOCS_PACKAGE__/components/ui/ButtonGroup'
<\/script>

<template>
  <div class="grid gap-4">
    <ButtonGroup v-for="size in ['xs', 'sm', 'md', 'lg']" :key="size" :size="size" :aria-label="\`Acciones tamaño \${size}\`">
      <Button label="Cancelar" variant="outline" />
      <Button label="Aceptar" />
    </ButtonGroup>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Tamaños"
    description="El tamaño se aplica a todos los botones descendientes."
    :code="code"
    :show-reset="false"
  >
    <div class="grid gap-4">
      <ButtonGroup
        v-for="size in ['xs', 'sm', 'md', 'lg']"
        :key="size"
        :size="size"
        :aria-label="`Acciones tamaño ${size}`"
      >
        <Button label="Cancelar" variant="outline" />
        <Button label="Aceptar" />
      </ButtonGroup>
    </div>
  </ComponentExample>
</template>
