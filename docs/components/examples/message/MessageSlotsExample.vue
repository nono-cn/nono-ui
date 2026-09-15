<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import { Message } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
import { Message } from '@nono-cn/nono-ui/components/ui/Message'
${scriptEnd}

<template>
  <Message class="w-full max-w-md">
    <template #header>
      <span class="text-xs font-medium text-muted-foreground">María · 10:42</span>
    </template>
    <template #avatar>
      <Avatar label="MR" aria-label="María" />
    </template>
    <template #default>He revisado la propuesta.</template>
    <template #reaction>
      <span aria-label="Aprobado">👍</span>
    </template>
    <template #footer>
      <span class="text-xs text-muted-foreground">Visto</span>
    </template>
  </Message>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Combina los slots públicos para construir un mensaje completo."
    :code="code"
    :show-reset="false"
  >
    <Message class="w-full max-w-md">
      <template #header>
        <span class="text-xs font-medium text-muted-foreground">María · 10:42</span>
      </template>
      <template #avatar>
        <Avatar label="MR" aria-label="María" />
      </template>
      <template #default>He revisado la propuesta.</template>
      <template #reaction>
        <span aria-label="Aprobado">👍</span>
      </template>
      <template #footer>
        <span class="text-xs text-muted-foreground">Visto</span>
      </template>
    </Message>
  </ComponentExample>
</template>
