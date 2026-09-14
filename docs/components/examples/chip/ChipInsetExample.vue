<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import { Chip } from '@/components/ui/Chip'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const inset = ref(false)
const code = computed(
  () => `<script setup lang="ts">
import { Chip } from '@nono-cn/nono-ui/components/ui/Chip'
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
${scriptEnd}

<template>
  <Chip :inset="${inset.value}">
    <Avatar label="CN" aria-label="Cuenta de Nono" />
  </Chip>
</template>`,
)
function reset() {
  inset.value = false
}
</script>
<template>
  <ComponentExample
    title="Inset"
    description="Controla el desplazamiento del chip."
    :code="code"
    @reset="reset"
    ><template #controls
      ><label class="flex items-center gap-2 text-sm"
        ><input v-model="inset" type="checkbox" /> inset</label
      ></template
    >
    <Chip :inset="inset"><Avatar label="CN" aria-label="Cuenta de Nono" /></Chip>
  </ComponentExample>
</template>
