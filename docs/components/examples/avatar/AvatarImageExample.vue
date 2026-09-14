<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
${scriptEnd}

<template>
  <Avatar
    src="https://github.com/shadcn.png"
    alt="Avatar de shadcn"
    label="SC"
    class="ring-2 ring-primary/20"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Image"
    description="src se renderiza como imagen y los atributos HTML se reenvían a la imagen o al fallback."
    :code="code"
    :show-reset="false"
  >
    <Avatar
      src="https://github.com/shadcn.png"
      alt="Avatar de shadcn"
      label="SC"
      class="ring-2 ring-primary/20"
    />
  </ComponentExample>
</template>
