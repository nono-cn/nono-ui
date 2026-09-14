<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { Popover } from '@/components/ui/Popover'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
import { Popover } from '@nono-cn/nono-ui/components/ui/Popover'
${scriptEnd}

<template>
  <Popover>
    <Button variant="outline">Abrir popover</Button>

    <template #content>
      <div class="grid gap-1.5">
        <p class="text-sm font-medium">Contenido contextual</p>
        <p class="text-sm text-muted-foreground">
          Usa un popover para mostrar información relacionada sin abandonar la vista actual.
        </p>
      </div>
    </template>
  </Popover>
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Combina un disparador en el slot default con el contenido del slot content."
    :code="code"
    :show-reset="false"
  >
    <Popover>
      <Button variant="outline">Abrir popover</Button>

      <template #content>
        <div class="grid gap-1.5">
          <p class="text-sm font-medium">Contenido contextual</p>
          <p class="text-sm text-muted-foreground">
            Usa un popover para mostrar información relacionada sin abandonar la vista actual.
          </p>
        </div>
      </template>
    </Popover>
  </ComponentExample>
</template>
