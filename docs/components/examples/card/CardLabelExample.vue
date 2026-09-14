<script setup lang="ts">
import { computed, ref } from 'vue'
import { Card } from '@/components/ui/Card'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialLabel = 'Configuración'
const label = ref(initialLabel)
const code = computed(
  () => `<script setup lang="ts">
import { Card } from '@nono-cn/nono-ui/components/ui/Card'
${scriptEnd}
<template>
  <Card label="${label.value}">
    <p>Administra tus preferencias.</p>
  </Card>
</template>`,
)

function reset() {
  label.value = initialLabel
}
</script>

<template>
  <ComponentExample
    title="Label"
    description="Muestra un encabezado en la card."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><label class="grid gap-1.5 text-xs font-medium"
        >label<input
          v-model="label"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal" /></label
    ></template>
    <Card :label="label"><p>Administra tus preferencias.</p></Card>
  </ComponentExample>
</template>
