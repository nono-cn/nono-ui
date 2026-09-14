<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon, type IconSize } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSize: IconSize = 'md'
const size = ref<IconSize>(initialSize)
const sizes: IconSize[] = ['xs', 'sm', 'md', 'lg']

const code = computed(
  () => `<script setup lang="ts">
import { Icon } from '@nono-cn/nono-ui/components/ui/Icon'
${scriptEnd}

<template>
  <Icon name="check" size="${size.value}" />
</template>`,
)

function reset() {
  size.value = initialSize
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Selecciona el tamaño visual del icono."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="icon-size">
        size
        <select
          id="icon-size"
          v-model="size"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="iconSize in sizes" :key="iconSize" :value="iconSize">
            {{ iconSize }}
          </option>
        </select>
      </label>
    </template>
    <Icon name="check" :size="size" />
  </ComponentExample>
</template>
