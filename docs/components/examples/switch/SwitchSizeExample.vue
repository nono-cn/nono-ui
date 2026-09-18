<script setup lang="ts">
import { computed, ref } from 'vue'
import { Switch, type SwitchSize } from '@/components/ui/Switch'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSize: SwitchSize = 'md'
const size = ref<SwitchSize>(initialSize)
const sizes: SwitchSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@nono-cn/nono-ui/components/ui/Switch'

const enabled = ref(false)
const size = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('${size.value}')
${scriptEnd}

<template>
  <Switch v-model:value="enabled" :size="size" aria-label="Tamaño" />
</template>`,
)

function reset() {
  size.value = initialSize
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Ajusta el tamaño del switch y su thumb."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="switch-size">
        size
        <select
          id="switch-size"
          v-model="size"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="switchSize in sizes" :key="switchSize" :value="switchSize">
            {{ switchSize }}
          </option>
        </select>
      </label>
    </template>
    <Switch :size="size" aria-label="Tamaño" />
  </ComponentExample>
</template>
