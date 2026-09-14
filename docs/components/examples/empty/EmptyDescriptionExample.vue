<script setup lang="ts">
import { computed, ref } from 'vue'
import { Empty } from '@/components/ui/Empty'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const description = ref('Prueba con otros términos de búsqueda.')
const code = computed(
  () => `<script setup lang="ts">
import { Empty } from '@nono-cn/nono-ui/components/ui/Empty'
${scriptEnd}

<template>
  <Empty label="Sin resultados" description="${description.value}" />
</template>`,
)
function reset() {
  description.value = 'Prueba con otros términos de búsqueda.'
}
</script>
<template>
  <ComponentExample
    title="Description"
    description="Configura el texto complementario."
    :code="code"
    @reset="reset"
    ><template #controls
      ><input
        v-model="description"
        class="h-9 rounded-md border bg-background px-3 text-sm" /></template
    ><Empty label="Sin resultados" :description="description"
  /></ComponentExample>
</template>
