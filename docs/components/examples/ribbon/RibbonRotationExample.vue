<script setup lang="ts">
import { computed, ref } from 'vue'
import { Ribbon } from '@/components/ui/Ribbon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialRotate = 45
const initialZIndex = 30
const rotate = ref(initialRotate)
const zIndex = ref(initialZIndex)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Ribbon } from '@nono-cn/nono-ui/components/ui/Ribbon'

const rotate = ref(${rotate.value})
const zIndex = ref(${zIndex.value})
${scriptEnd}

<template>
  <Ribbon
    :ribbons="[{ label: 'Controlada', severity: 'success', rotate, zIndex }]"
    class="h-52 w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground"
  >
    <div class="relative z-10 grid h-full place-items-center text-center">
      <p class="font-semibold">Una cinta configurable</p>
    </div>
  </Ribbon>
</template>`,
)

function reset() {
  rotate.value = initialRotate
  zIndex.value = initialZIndex
}
</script>

<template>
  <ComponentExample
    title="Rotate & zIndex"
    description="Controla el ángulo y el orden de apilado de una cinta."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="grid gap-3 sm:grid-cols-2">
        <label class="grid gap-1.5 text-xs font-medium" for="ribbon-rotate">
          rotate
          <input
            id="ribbon-rotate"
            v-model.number="rotate"
            type="number"
            min="-180"
            max="180"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          />
        </label>
        <label class="grid gap-1.5 text-xs font-medium" for="ribbon-z-index">
          zIndex
          <input
            id="ribbon-z-index"
            v-model.number="zIndex"
            type="number"
            min="0"
            max="50"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          />
        </label>
      </div>
    </template>
    <Ribbon
      :ribbons="[{ label: 'Controlada', severity: 'success', rotate, zIndex }]"
      class="h-52 w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground"
    >
      <div class="relative z-10 grid h-full place-items-center text-center">
        <p class="font-semibold">Una cinta configurable</p>
      </div>
    </Ribbon>
  </ComponentExample>
</template>
