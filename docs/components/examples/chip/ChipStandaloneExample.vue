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
  <Chip class="mr-8" size="3xl" standalone aria-label="standalone=true">
    <Avatar label="ON" size="lg" />
  </Chip>
  <Chip size="3xl" position="top-right" :standalone="false" aria-label="standalone=false">
    <Avatar label="OFF" size="lg" />
  </Chip>
</template>`
</script>

<template>
  <ComponentExample
    title="Standalone"
    description="Muestra el indicador sin posicionamiento absoluto."
    :code="code"
    :show-reset="false"
  >
    <Chip class="mr-8" size="3xl" standalone aria-label="standalone=true">
      <Avatar label="ON" size="lg" />
    </Chip>
    <Chip size="3xl" position="top-right" :standalone="false" aria-label="standalone=false">
      <Avatar label="OFF" size="lg" />
    </Chip>
  </ComponentExample>
</template>
