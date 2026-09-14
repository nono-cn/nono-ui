<script setup lang="ts">
import { computed, ref } from 'vue'
import { Ribbon } from '@/components/ui/Ribbon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialColor = '#7c3aed'
const color = ref(initialColor)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Ribbon } from '@nono-cn/nono-ui/components/ui/Ribbon'

const color = ref('${color.value}')
${scriptEnd}

<template>
  <Ribbon
    :ribbons="[{ label: 'Personalizado', severity: 'error', color }]"
    class="h-52 w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground"
  >
    <div class="relative z-10 grid h-full place-items-center text-center">
      <p class="font-semibold">Color personalizado</p>
    </div>
  </Ribbon>
</template>`,
)

function reset() {
  color.value = initialColor
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="El color CSS personalizado tiene prioridad sobre severity."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="flex max-w-xs items-center gap-3 text-xs font-medium" for="ribbon-color">
        color
        <input
          id="ribbon-color"
          v-model="color"
          type="color"
          class="h-9 w-14 cursor-pointer rounded-md border bg-background p-1"
        />
        <code class="rounded bg-muted px-1.5 py-0.5 font-normal">{{ color }}</code>
      </label>
    </template>
    <Ribbon
      :ribbons="[{ label: 'Personalizado', severity: 'error', color }]"
      class="h-52 w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground"
    >
      <div class="relative z-10 grid h-full place-items-center text-center">
        <p class="font-semibold">Color personalizado</p>
      </div>
    </Ribbon>
  </ComponentExample>
</template>
