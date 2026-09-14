<script setup lang="ts">
import { computed, ref } from 'vue'
import { Kbd, type KbdSize } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSize: KbdSize = 'md'
const size = ref<KbdSize>(initialSize)
const sizes: KbdSize[] = ['sm', 'md', 'lg']

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Kbd } from '@nono-cn/nono-ui/components/ui/Kbd'

const size = ref<'sm' | 'md' | 'lg'>('${size.value}')
${scriptEnd}

<template>
  <Kbd label="Ctrl" :size="size" />
</template>`,
)

function reset() {
  size.value = initialSize
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Selecciona el tamaño visual de la tecla."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="kbd-size">
        size
        <select
          id="kbd-size"
          v-model="size"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="kbdSize in sizes" :key="kbdSize" :value="kbdSize">
            {{ kbdSize }}
          </option>
        </select>
      </label>
    </template>
    <Kbd label="Ctrl" :size="size" />
  </ComponentExample>
</template>
