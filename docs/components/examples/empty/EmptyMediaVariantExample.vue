<script setup lang="ts">
import { Empty } from '@/components/ui/Empty'
import { Icon } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Empty } from '@nono-cn/nono-ui/components/ui/Empty'
import { Icon } from '@nono-cn/nono-ui/components/ui/Icon'
${scriptEnd}

<template>
  <Empty
    class="w-full"
    label="No hay archivos"
    description="Sube un archivo para verlo aquí."
    media-variant="icon"
  >
    <template #media>
      <Icon name="folderOpen" size="lg" />
    </template>
  </Empty>
</template>`
</script>

<template>
  <ComponentExample
    title="MediaVariant"
    description="Aplica el tratamiento visual de icono al contenido media."
    :code="code"
    :show-reset="false"
  >
    <Empty
      class="w-full"
      label="No hay archivos"
      description="Sube un archivo para verlo aquí."
      media-variant="icon"
    >
      <template #media>
        <Icon name="folderOpen" size="lg" />
      </template>
    </Empty>
  </ComponentExample>
</template>
