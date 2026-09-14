<script setup lang="ts">
import { Label } from '@/components/ui/Label'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const code = `<script setup lang="ts">
import { Label } from '@nono-cn/nono-ui/components/ui/Label'
${scriptEnd}

<template>
  <div class="grid gap-2">
    <Label for="username">Nombre de usuario</Label>
    <input id="username" type="text" placeholder="nono" />
  </div>
</template>`
</script>
<template>
  <ComponentExample
    title="For"
    description="Relaciona la etiqueta con un input mediante for e id."
    :code="code"
    :show-reset="false"
    ><div class="grid max-w-sm gap-2">
      <Label for="username">Nombre de usuario</Label
      ><input
        id="username"
        type="text"
        placeholder="nono"
        class="h-9 rounded-md border bg-background px-3 text-sm"
      /></div
  ></ComponentExample>
</template>
