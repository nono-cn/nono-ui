<script setup lang="ts">
import { computed, ref } from 'vue'
import { Card } from '@/components/ui/Card'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialLabel = 'Perfil'
const initialDescription = 'Actualiza tus datos personales.'
const label = ref(initialLabel)
const description = ref(initialDescription)
const code = computed(
  () => `<script setup lang="ts">
import { Card } from '@nono-cn/nono-ui/components/ui/Card'
${scriptEnd}
<template>
  <Card label="${label.value}" description="${description.value}">
    <p>Contenido del perfil.</p>
  </Card>
</template>`,
)

function reset() {
  label.value = initialLabel
  description.value = initialDescription
}
</script>

<template>
  <ComponentExample
    title="Description"
    description="Muestra texto auxiliar bajo el encabezado."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><div class="flex flex-wrap gap-4">
        <label class="grid gap-1.5 text-xs font-medium"
          >label<input
            v-model="label"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal" /></label
        ><label class="grid gap-1.5 text-xs font-medium"
          >description<input
            v-model="description"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        /></label></div
    ></template>
    <Card :label="label" :description="description"><p>Contenido del perfil.</p></Card>
  </ComponentExample>
</template>
