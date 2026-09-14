<script setup lang="ts">
import { ref, computed } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import { Chip, type ChipPosition } from '@/components/ui/Chip'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const position = ref<ChipPosition>('top-right')
const code = computed(
  () => `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
import { Chip } from '@nono-cn/nono-ui/components/ui/Chip'
${scriptEnd}

<template>
  <Chip position="${position.value}">
    <Avatar label="CN" aria-label="Cuenta de Nono" />
  </Chip>
</template>`,
)
function reset() {
  position.value = 'top-right'
}
</script>
<template>
  <ComponentExample
    title="Position"
    description="Cambia la esquina donde aparece el chip."
    :code="code"
    @reset="reset"
    ><template #controls
      ><select v-model="position" class="h-9 rounded-md border bg-background px-3 text-sm">
        <option
          v-for="value in ['top-right', 'bottom-right', 'top-left', 'bottom-left']"
          :key="value"
          :value="value"
        >
          {{ value }}
        </option>
      </select></template
    >
    <Chip :position="position"><Avatar label="CN" aria-label="Cuenta de Nono" /></Chip>
  </ComponentExample>
</template>
