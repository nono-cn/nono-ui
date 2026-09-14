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
  <Chip>
    <Avatar label="CN" aria-label="Cuenta de Nono" />
  </Chip>
</template>`
</script>
<template>
  <ComponentExample
    title="Uso básico"
    description="Coloca un chip sobre un elemento."
    :code="code"
    :show-reset="false"
  >
    <Chip>
      <Avatar label="CN" aria-label="Cuenta de Nono" />
    </Chip>
  </ComponentExample>
</template>
