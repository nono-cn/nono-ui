<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const initialOrientation = 'vertical' as const
const orientation = ref<'horizontal' | 'vertical'>(initialOrientation)
const orientations = ['horizontal', 'vertical'] as const

const code = computed(
  () => `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
import { ButtonGroup } from '@nono-cn/nono-ui/components/ui/ButtonGroup'
${scriptEnd}
<template>
  <ButtonGroup orientation="${orientation.value}">
    <Button label="Perfil" />
    <Button label="Cuenta" variant="outline" />
    <Button label="Salir" severity="secondary" />
  </ButtonGroup>
</template>`,
)

function reset() {
  orientation.value = initialOrientation
}
</script>
<template>
  <ComponentExample
    title="Orientation"
    description="Coloca las acciones en vertical."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="button-group-orientation">
        orientation
        <select
          id="button-group-orientation"
          v-model="orientation"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="item in orientations" :key="item" :value="item">{{ item }}</option>
        </select>
      </label>
    </template>
    <ButtonGroup :orientation="orientation">
      <Button label="Perfil" />
      <Button label="Cuenta" variant="outline" />
      <Button label="Salir" severity="secondary" />
    </ButtonGroup>
  </ComponentExample>
</template>
