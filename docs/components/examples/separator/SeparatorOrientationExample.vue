<script setup lang="ts">
import { computed, ref } from 'vue'
import { Separator } from '@/components/ui/Separator'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialOrientation = 'horizontal' as const
const orientation = ref<'horizontal' | 'vertical'>(initialOrientation)
const orientations = ['horizontal', 'vertical'] as const

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Separator } from '@nono-cn/nono-ui/components/ui/Separator'

const orientation = ref<'horizontal' | 'vertical'>('${orientation.value}')
${scriptEnd}

<template>
  <div :class="orientation === 'horizontal' ? 'grid gap-3' : 'flex min-h-20 items-center gap-3'">
    <span class="text-sm">Contenido A</span>
    <Separator :orientation="orientation" />
    <span class="text-sm">Contenido B</span>
  </div>
</template>`,
)

function reset() {
  orientation.value = initialOrientation
}
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="Selecciona la orientación que mejor encaje con el contenido que estás separando."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="separator-orientation">
        orientation
        <select
          id="separator-orientation"
          v-model="orientation"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option
            v-for="separatorOrientation in orientations"
            :key="separatorOrientation"
            :value="separatorOrientation"
          >
            {{ separatorOrientation }}
          </option>
        </select>
      </label>
    </template>
    <div
      :class="
        orientation === 'horizontal'
          ? 'grid w-full max-w-md gap-3'
          : 'flex min-h-20 items-center gap-3'
      "
    >
      <span class="text-sm">Contenido A</span>
      <Separator :orientation="orientation" />
      <span class="text-sm">Contenido B</span>
    </div>
  </ComponentExample>
</template>
