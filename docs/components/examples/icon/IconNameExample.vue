<script setup lang="ts">
import { Icon } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Icon } from '__DOCS_PACKAGE__/components/ui/Icon'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-end gap-5">
    <div class="grid justify-items-center gap-2">
      <Icon name="check" />
      <span class="text-xs text-muted-foreground">check</span>
    </div>
    <div class="grid justify-items-center gap-2">
      <Icon name="info" />
      <span class="text-xs text-muted-foreground">info</span>
    </div>
    <div class="grid justify-items-center gap-2">
      <Icon name="warning" />
      <span class="text-xs text-muted-foreground">warning</span>
    </div>
    <div class="grid justify-items-center gap-2">
      <Icon name="error" />
      <span class="text-xs text-muted-foreground">error</span>
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Name"
    description="Selecciona un icono por su nombre registrado en la librería."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-end gap-5">
      <div class="grid justify-items-center gap-2">
        <Icon name="check" />
        <span class="text-xs text-muted-foreground">check</span>
      </div>
      <div class="grid justify-items-center gap-2">
        <Icon name="info" />
        <span class="text-xs text-muted-foreground">info</span>
      </div>
      <div class="grid justify-items-center gap-2">
        <Icon name="warning" />
        <span class="text-xs text-muted-foreground">warning</span>
      </div>
      <div class="grid justify-items-center gap-2">
        <Icon name="error" />
        <span class="text-xs text-muted-foreground">error</span>
      </div>
    </div>
  </ComponentExample>
</template>
