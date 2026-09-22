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
  <div class="flex flex-wrap items-center gap-6">
    <Chip position="top-left"><Avatar label="TL" size="lg" /></Chip>
    <Chip position="top-right"><Avatar label="TR" size="lg" /></Chip>
    <Chip position="bottom-left"><Avatar label="BL" size="lg" /></Chip>
    <Chip position="bottom-right"><Avatar label="BR" size="lg" /></Chip>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Position"
    description="Coloca el indicador en una de las esquinas disponibles."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-6">
      <Chip position="top-left"><Avatar label="TL" size="lg" /></Chip>
      <Chip position="top-right"><Avatar label="TR" size="lg" /></Chip>
      <Chip position="bottom-left"><Avatar label="BL" size="lg" /></Chip>
      <Chip position="bottom-right"><Avatar label="BR" size="lg" /></Chip>
    </div>
  </ComponentExample>
</template>
