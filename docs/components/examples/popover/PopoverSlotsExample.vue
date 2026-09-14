<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { Popover } from '@/components/ui/Popover'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
import { Popover } from '@nono-cn/nono-ui/components/ui/Popover'
${scriptEnd}

<template>
  <Popover>
    <template #default="{ open }">
      <Button variant="outline">{{ open ? 'Abierto' : 'Abrir popover' }}</Button>
    </template>

    <template #content="{ open, close }">
      <div class="grid gap-3">
        <p class="text-sm">El popover está {{ open ? 'abierto' : 'cerrado' }}.</p>
        <Button size="sm" @click="close">Cerrar</Button>
      </div>
    </template>
  </Popover>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Los slots default y content reciben open y close para crear disparadores y cierres personalizados."
    :code="code"
    :show-reset="false"
  >
    <Popover>
      <template #default="{ open }">
        <Button variant="outline">{{ open ? 'Abierto' : 'Abrir popover' }}</Button>
      </template>

      <template #content="{ open, close }">
        <div class="grid gap-3">
          <p class="text-sm">El popover está {{ open ? 'abierto' : 'cerrado' }}.</p>
          <Button size="sm" @click="close">Cerrar</Button>
        </div>
      </template>
    </Popover>
  </ComponentExample>
</template>
