<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@/components/ui/Textarea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const autoresize = ref(true)
const value = ref('Escribe varias líneas para comprobar el tamaño del campo.')

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@nono-cn/nono-ui/components/ui/Textarea'

const autoresize = ref(true)
const value = ref('Escribe varias líneas para comprobar el tamaño del campo.')
${scriptEnd}

<template>
  <Textarea v-model:value="value" :autoresize="autoresize" />
</template>`
</script>

<template>
  <ComponentExample
    title="Auto-resize"
    description="Cambia entre una altura fija y el ajuste automático al contenido."
    :code="code"
    @reset="autoresize = true"
  >
    <template #controls>
      <label class="flex items-center gap-2 text-sm">
        <input v-model="autoresize" type="checkbox" />
        autoresize
      </label>
    </template>
    <Textarea
      value="Escribe varias líneas para comprobar el tamaño del campo."
      :autoresize="autoresize"
      aria-label="Texto con auto-resize"
    />
  </ComponentExample>
</template>
