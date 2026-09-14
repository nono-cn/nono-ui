<script setup lang="ts">
import { Icon } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Icon } from '@nono-cn/nono-ui/components/ui/Icon'
${scriptEnd}

<template>
  <div class="flex items-center gap-4">
    <Icon name="search" aria-hidden="true" />
    <Icon name="info" aria-hidden="false" aria-label="Información" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Iconos decorativos y semánticos"
    description="Los iconos decorativos permanecen ocultos para lectores de pantalla; los informativos tienen un nombre accesible."
    :code="code"
    :show-reset="false"
  >
    <div class="flex items-center gap-4">
      <span class="grid gap-1 text-center text-xs text-muted-foreground">
        <Icon name="search" aria-hidden="true" class="mx-auto" />
        Decorativo
      </span>
      <span class="grid gap-1 text-center text-xs text-muted-foreground">
        <Icon name="info" aria-hidden="false" aria-label="Información" class="mx-auto" />
        Informativo
      </span>
    </div>
  </ComponentExample>
</template>
