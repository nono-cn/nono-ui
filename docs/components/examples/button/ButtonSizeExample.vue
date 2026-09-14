<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button, type ButtonSize } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSize: ButtonSize = 'md'
const size = ref<ButtonSize>(initialSize)
const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg']

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'

const size = ref<'xs' | 'sm' | 'md' | 'lg'>('${size.value}')
${scriptEnd}

<template>
  <Button label="Guardar" :size="size" />
</template>`,
)

function reset() {
  size.value = initialSize
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Selecciona el tamaño visual del botón."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="button-size">
        size
        <select
          id="button-size"
          v-model="size"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="buttonSize in sizes" :key="buttonSize" :value="buttonSize">
            {{ buttonSize }}
          </option>
        </select>
      </label>
    </template>
    <Button label="Guardar" :size="size" />
  </ComponentExample>
</template>
