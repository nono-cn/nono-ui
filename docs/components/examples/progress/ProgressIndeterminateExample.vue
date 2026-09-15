<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialAnimation = 'carousel'
const animation = ref(initialAnimation)
const animations = ['carousel', 'carousel-inverse', 'swing', 'elastic'] as const

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '@nono-cn/nono-ui/components/ui/Progress'

const animation = ref(${JSON.stringify(animation.value)})
${scriptEnd}

<template>
  <Progress :value="null" :animation="animation" />
</template>`,
)

function reset() {
  animation.value = initialAnimation
}
</script>

<template>
  <ComponentExample
    title="Indeterminate"
    description="Cuando value es null, la barra muestra progreso indeterminado con una animación configurable."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid w-full max-w-md gap-1.5 text-xs font-medium" for="progress-animation">
        animation
        <select
          id="progress-animation"
          v-model="animation"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="option in animations" :key="option" :value="option">{{ option }}</option>
        </select>
      </label>
    </template>
    <Progress class="w-full max-w-md" :value="null" :animation="animation" />
  </ComponentExample>
</template>
