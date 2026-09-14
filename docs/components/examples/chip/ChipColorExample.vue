<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import { Chip } from '@/components/ui/Chip'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const color = ref('#f97316')
const code = computed(
  () => `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
import { Chip } from '@nono-cn/nono-ui/components/ui/Chip'
${scriptEnd}

<template>
  <Chip color="${color.value}">
    <Avatar label="CN" aria-label="Cuenta de Nono" />
  </Chip>
</template>`,
)
function reset() {
  color.value = '#f97316'
}
</script>
<template>
  <ComponentExample
    title="Color"
    description="Elige un color personalizado."
    :code="code"
    @reset="reset"
    ><template #controls
      ><input
        v-model="color"
        type="color"
        class="h-9 w-14 rounded-md border bg-background p-1" /></template
    ><Chip :color="color"><Avatar label="CN" aria-label="Cuenta de Nono" /></Chip
  ></ComponentExample>
</template>
