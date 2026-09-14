<script setup lang="ts">
import { computed, ref } from 'vue'
import { Ribbon } from '@/components/ui/Ribbon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialPosition = 'top-right' as const
const position = ref<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>(initialPosition)
const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Ribbon } from '@nono-cn/nono-ui/components/ui/Ribbon'

const position = ref<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>('${position.value}')
${scriptEnd}

<template>
  <Ribbon
    :ribbons="[{ label: 'Posición', position }]"
    class="h-52 w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground"
  >
    <div class="relative z-10 grid h-full place-items-center text-center">
      <p class="font-semibold">{{ position }}</p>
    </div>
  </Ribbon>
</template>`,
)

function reset() {
  position.value = initialPosition
}
</script>

<template>
  <ComponentExample
    title="Position"
    description="Cambia position para mover la banda sin modificar el contenido."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="ribbon-position">
        position
        <select
          id="ribbon-position"
          v-model="position"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="item in positions" :key="item" :value="item">{{ item }}</option>
        </select>
      </label>
    </template>
    <Ribbon
      :ribbons="[{ label: 'Posición', position }]"
      class="h-52 w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground"
    >
      <div class="relative z-10 grid h-full place-items-center text-center">
        <p class="font-semibold">{{ position }}</p>
      </div>
    </Ribbon>
  </ComponentExample>
</template>
