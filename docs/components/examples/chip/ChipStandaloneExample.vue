<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import { Chip } from '@/components/ui/Chip'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const standalone = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { Chip } from '@nono-cn/nono-ui/components/ui/Chip'
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
${scriptEnd}

<template>
  <Chip :standalone="${standalone.value}">
    <Avatar label="CN" aria-label="Cuenta de Nono" />
  </Chip>
</template>`,
)
function reset() {
  standalone.value = true
}
</script>
<template>
  <ComponentExample
    title="Standalone"
    description="Controla si el chip usa posicionamiento absoluto."
    :code="code"
    @reset="reset"
    ><template #controls
      ><label class="flex items-center gap-2 text-sm"
        ><input v-model="standalone" type="checkbox" /> standalone</label
      ></template
    ><Chip :standalone="standalone"><Avatar label="CN" aria-label="Cuenta de Nono" /></Chip
  ></ComponentExample>
</template>
