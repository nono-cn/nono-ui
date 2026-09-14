<script setup lang="ts">
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Icon } from '@nono-cn/nono-ui/components/ui/Icon'
import { Badge } from '@nono-cn/nono-ui/components/ui/Badge'
${scriptEnd}

<template>
  <Badge variant="soft" severity="success">
    <template #leading>
      <Icon name="check" size="sm" />
    </template>
    <span>Verificado</span>
    <template #trailing>
      <Icon name="chevronRight" size="sm" />
    </template>
  </Badge>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Personaliza el contenido principal y sustituye los iconos fallback con los slots disponibles."
    :code="code"
    :show-reset="false"
  >
    <Badge variant="soft" severity="success">
      <template #leading>
        <Icon name="check" size="sm" />
      </template>
      <span>Verificado</span>
      <template #trailing>
        <Icon name="chevronRight" size="sm" />
      </template>
    </Badge>
  </ComponentExample>
</template>
