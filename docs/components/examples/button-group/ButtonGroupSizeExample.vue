<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const initialSize = 'sm' as const
const size = ref<'xs' | 'sm' | 'md' | 'lg'>(initialSize)
const sizes = ['xs', 'sm', 'md', 'lg'] as const

const code = computed(
  () => `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
import { ButtonGroup } from '@nono-cn/nono-ui/components/ui/ButtonGroup'
${scriptEnd}
<template>
  <ButtonGroup size="${size.value}">
    <Button label="Día" />
    <Button label="Semana" variant="outline" />
    <Button label="Borrar" severity="error" :icon="{ name: 'save' }" />
  </ButtonGroup>
</template>`,
)

function reset() {
  size.value = initialSize
}
</script>
<template>
  <ComponentExample
    title="Size"
    description="Comparte el tamaño entre los botones del grupo."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="button-group-size">
        size
        <select
          id="button-group-size"
          v-model="size"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="item in sizes" :key="item" :value="item">{{ item }}</option>
        </select>
      </label>
    </template>
    <ButtonGroup :size="size">
      <Button label="Día" />
      <Button label="Semana" variant="outline" />
      <Button label="Borrar" severity="error" :icon="{ name: 'save' }" />
    </ButtonGroup>
  </ComponentExample>
</template>
