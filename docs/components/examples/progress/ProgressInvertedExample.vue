<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const inverted = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '@nono-cn/nono-ui/components/ui/Progress'

const inverted = ref(${inverted.value})
${scriptEnd}

<template><Progress :value="65" :inverted="inverted" /></template>`,
)
function reset() {
  inverted.value = true
}
</script>
<template>
  <ComponentExample
    title="Inverted"
    description="Invierte la dirección de llenado del indicador."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><label class="flex items-center gap-2 text-xs font-medium"
        ><input v-model="inverted" type="checkbox" /> inverted</label
      ></template
    >
    <Progress class="w-full max-w-md" :value="65" :inverted="inverted" />
  </ComponentExample>
</template>
