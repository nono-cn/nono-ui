<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
${scriptEnd}

<template>
  <div class="flex items-center gap-3">
    <Avatar label="CN" />
    <Avatar :icon="{ name: 'user', 'aria-hidden': true }" />
    <Avatar>
      <template #fallback>
        <span class="bg-primary px-2 font-semibold text-primary-foreground">NN</span>
      </template>
    </Avatar>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Fallback e icon"
    description="Elige entre texto, IconConfig o contenido completamente personalizado para el fallback."
    :code="code"
    :show-reset="false"
  >
    <div class="flex items-center gap-3">
      <Avatar label="CN" />
      <Avatar :icon="{ name: 'user', 'aria-hidden': true }" />
      <Avatar>
        <template #fallback>
          <span class="bg-primary px-2 font-semibold text-primary-foreground">NN</span>
        </template>
      </Avatar>
    </div>
  </ComponentExample>
</template>
