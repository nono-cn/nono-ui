<script setup lang="ts">
import { computed, ref } from 'vue'
import { ScrollArea } from '@/components/ui/ScrollArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialOrientation = 'vertical' as const
const orientation = ref<'vertical' | 'horizontal' | 'both'>(initialOrientation)
const orientations = ['vertical', 'horizontal', 'both'] as const
const cards = [
  'Overview',
  'Components',
  'Patterns',
  'Accessibility',
  'Tokens',
  'Changelog',
  'Guides',
  'Integrations',
  'Themes',
  'Releases',
  'Migration',
  'Resources',
]

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { ScrollArea } from '@nono-cn/nono-ui/components/ui/ScrollArea'

const orientation = ref<'vertical' | 'horizontal' | 'both'>('${orientation.value}')
const cards = [
  'Overview',
  'Components',
  'Patterns',
  'Accessibility',
  'Tokens',
  'Changelog',
  'Guides',
  'Integrations',
  'Themes',
  'Releases',
  'Migration',
  'Resources',
]
${scriptEnd}

<template>
  <div class="grid w-full max-w-xl gap-2">
    <div class="flex items-center justify-between text-xs text-muted-foreground">
      <span>Dirección del desplazamiento</span>
      <code class="rounded bg-muted px-1.5 py-0.5">{{ orientation }}</code>
    </div>
    <ScrollArea
      type="always"
      class="h-56 w-full min-w-0 rounded-md border"
      :orientation="orientation"
    >
      <div
        :class="[
          orientation === 'vertical'
            ? 'grid h-[42rem] w-full'
            : orientation === 'horizontal'
              ? 'flex h-full w-[72rem] items-stretch'
              : 'grid h-[42rem] w-[72rem] grid-cols-4',
          'gap-3 p-4',
        ]"
      >
        <div
          v-for="card in cards"
          :key="card"
          class="flex min-w-40 items-center rounded-md border bg-card p-3 text-sm"
        >
          {{ card }}
        </div>
      </div>
    </ScrollArea>
    <p class="text-xs text-muted-foreground">
      {{ orientation === 'horizontal' ? 'Desplázate de izquierda a derecha.' : orientation === 'both' ? 'Desplázate en los dos ejes.' : 'Desplázate de arriba abajo.' }}
    </p>
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
    description="Cambia el eje y observa qué barra aparece en un contenido preparado para desbordar."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="scroll-area-orientation">
        orientation
        <select
          id="scroll-area-orientation"
          v-model="orientation"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option
            v-for="scrollOrientation in orientations"
            :key="scrollOrientation"
            :value="scrollOrientation"
          >
            {{ scrollOrientation }}
          </option>
        </select>
      </label>
    </template>
    <div class="grid w-full max-w-xl gap-2">
      <div class="flex items-center justify-between text-xs text-muted-foreground">
        <span>Dirección del desplazamiento</span>
        <code class="rounded bg-muted px-1.5 py-0.5">{{ orientation }}</code>
      </div>
      <ScrollArea
        type="always"
        class="h-56 w-full min-w-0 rounded-md border"
        :orientation="orientation"
      >
        <div
          :class="[
            orientation === 'vertical'
              ? 'grid h-[42rem] w-full'
              : orientation === 'horizontal'
                ? 'flex h-full w-[72rem] items-stretch'
                : 'grid h-[42rem] w-[72rem] grid-cols-4',
            'gap-3 p-4',
          ]"
        >
          <div
            v-for="card in cards"
            :key="card"
            class="flex min-w-40 items-center rounded-md border bg-card p-3 text-sm"
          >
            {{ card }}
          </div>
        </div>
      </ScrollArea>
      <p class="text-xs text-muted-foreground">
        {{
          orientation === 'horizontal'
            ? 'Desplázate de izquierda a derecha.'
            : orientation === 'both'
              ? 'Desplázate en los dos ejes.'
              : 'Desplázate de arriba abajo.'
        }}
      </p>
    </div>
  </ComponentExample>
</template>
