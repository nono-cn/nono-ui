<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox, type CheckboxSize } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSize: CheckboxSize = 'md'
const size = ref<CheckboxSize>(initialSize)
const sizes: CheckboxSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const checked = ref(true)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@nono-cn/nono-ui/components/ui/Checkbox'

const checked = ref(true)
const size = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('${size.value}')
${scriptEnd}

<template>
  <Checkbox v-model:value="checked" :size="size" aria-label="Tamaño" />
</template>`,
)

function reset() {
  size.value = initialSize
  checked.value = true
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Ajusta el tamaño del checkbox y de su icono."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="checkbox-size">
        size
        <select
          id="checkbox-size"
          v-model="size"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="checkboxSize in sizes" :key="checkboxSize" :value="checkboxSize">
            {{ checkboxSize }}
          </option>
        </select>
      </label>
    </template>
    <Checkbox v-model:value="checked" :size="size" aria-label="Tamaño" />
  </ComponentExample>
</template>
