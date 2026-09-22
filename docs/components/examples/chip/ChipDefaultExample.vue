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
  <Chip position="bottom-right">
    <Avatar label="NC" size="lg" />
  </Chip>
</template>`
</script>

<template>
  <ComponentExample
    title="Default"
    description="Usa el slot default para posicionar el chip sobre un elemento."
    :code="code"
    :show-reset="false"
  >
    <Chip position="bottom-right">
      <Avatar label="NC" size="lg" />
    </Chip>
  </ComponentExample>
</template>
