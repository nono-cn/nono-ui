<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSize = 'md'
const size = ref(initialSize)
const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '@nono-cn/nono-ui/components/ui/Progress'

const size = ref(${JSON.stringify(size.value)})
${scriptEnd}

<template>
  <Progress :value="65" :size="size" />
</template>`,
)

function reset() {
  size.value = initialSize
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Ajusta el grosor de la barra con tamaños predefinidos."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid w-full max-w-md gap-1.5 text-xs font-medium" for="progress-size">
        size
        <select
          id="progress-size"
          v-model="size"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="option in sizes" :key="option" :value="option">{{ option }}</option>
        </select>
      </label>
    </template>
    <Progress class="w-full max-w-md" :value="65" :size="size" />
  </ComponentExample>
</template>
