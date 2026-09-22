<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import { Chip } from '@/components/ui/Chip'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
import { Chip } from '@nono-cn/nono-ui/components/ui/Chip'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-8">
    <div class="grid justify-items-center gap-2">
      <Chip :show="true"><Avatar label="ON" size="lg" /></Chip>
      <span class="text-xs text-muted-foreground">Visible</span>
    </div>
    <div class="grid justify-items-center gap-2">
      <Chip :show="false"><Avatar label="OFF" size="lg" /></Chip>
      <span class="text-xs text-muted-foreground">Oculto</span>
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Show"
    description="Controla si el indicador se muestra."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-8">
      <div class="grid justify-items-center gap-2">
        <Chip :show="true"><Avatar label="ON" size="lg" /></Chip>
        <span class="text-xs text-muted-foreground">Visible</span>
      </div>
      <div class="grid justify-items-center gap-2">
        <Chip :show="false"><Avatar label="OFF" size="lg" /></Chip>
        <span class="text-xs text-muted-foreground">Oculto</span>
      </div>
    </div>
  </ComponentExample>
</template>
