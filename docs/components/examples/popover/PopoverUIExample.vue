<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { Popover } from '@/components/ui/Popover'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const ui = {
  content: () => ({ class: 'border-primary bg-primary text-primary-foreground' }),
  arrow: () => ({ class: 'fill-primary' }),
}

const code = `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
import { Popover } from '@nono-cn/nono-ui/components/ui/Popover'

const ui = {
  content: () => ({ class: 'border-primary bg-primary text-primary-foreground' }),
  arrow: () => ({ class: 'fill-primary' }),
}
${scriptEnd}

<template>
  <Popover :ui="ui" show-arrow>
    <Button variant="outline">Abrir popover</Button>

    <template #content>
      <p class="text-sm">El contenido y la flecha usan clases personalizadas.</p>
    </template>
  </Popover>
</template>`
</script>

<template>
  <ComponentExample
    title="UI"
    description="Personaliza los atributos de las partes internas con resolvers en ui."
    :code="code"
    :show-reset="false"
  >
    <Popover :ui="ui" show-arrow>
      <Button variant="outline">Abrir popover</Button>

      <template #content>
        <p class="text-sm">El contenido y la flecha usan clases personalizadas.</p>
      </template>
    </Popover>
  </ComponentExample>
</template>
