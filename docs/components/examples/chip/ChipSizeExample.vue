<script setup lang="ts">
import { ref, computed } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import { Chip, type ChipSize } from '@/components/ui/Chip'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const size = ref<ChipSize>('3xl')
const code = computed(
  () => `<script setup lang="ts">
import { Avatar } from '@nono-cn/nono-ui/components/ui/Avatar'
import { Chip } from '@nono-cn/nono-ui/components/ui/Chip'
${scriptEnd}

<template>
  <Chip size="${size.value}">
    <Avatar label="CN" aria-label="Cuenta de Nono" />
  </Chip>
</template>`,
)
function reset() {
  size.value = '3xl'
}
</script>
<template>
  <ComponentExample
    title="Size"
    description="Cambia el tamaño del chip."
    :code="code"
    @reset="reset"
    ><template #controls
      ><select v-model="size" class="h-9 rounded-md border bg-background px-3 text-sm">
        <option
          v-for="value in ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']"
          :key="value"
          :value="value"
        >
          {{ value }}
        </option>
      </select></template
    ><Chip :size="size"><Avatar label="CN" aria-label="Cuenta de Nono" /></Chip
  ></ComponentExample>
</template>
