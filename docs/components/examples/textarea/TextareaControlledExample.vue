<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@/components/ui/Textarea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialValue = 'Contenido editable'
const value = ref(initialValue)

function reset() {
  value.value = initialValue
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@nono-cn/nono-ui/components/ui/Textarea'

const value = ref('Contenido editable')
${scriptEnd}

<template>
  <Textarea v-model:value="value" aria-label="Contenido" />
</template>`
</script>

<template>
  <ComponentExample
    title="Valor controlado"
    description="El valor se sincroniza con el estado del componente."
    :code="code"
    @reset="reset"
  >
    <Textarea v-model:value="value" aria-label="Contenido" />
  </ComponentExample>
</template>
