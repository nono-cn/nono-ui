<script setup lang="ts">
import { computed, ref } from 'vue'
import { Empty } from '@/components/ui/Empty'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const label = ref('Sin resultados')
const code = computed(
  () => `<script setup lang="ts">
import { Empty } from '@nono-cn/nono-ui/components/ui/Empty'
${scriptEnd}

<template>
  <Empty label="${label.value}" description="Prueba con otros términos de búsqueda." />
</template>`,
)
function reset() {
  label.value = 'Sin resultados'
}
</script>
<template>
  <ComponentExample
    title="Label"
    description="Configura el título del estado vacío."
    :code="code"
    @reset="reset"
    ><template #controls
      ><input v-model="label" class="h-9 rounded-md border bg-background px-3 text-sm" /></template
    ><Empty :label="label" description="Prueba con otros términos de búsqueda."
  /></ComponentExample>
</template>
