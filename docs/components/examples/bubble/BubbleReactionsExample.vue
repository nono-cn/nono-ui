<script setup lang="ts">
import { Bubble } from '@/components/ui/Bubble'
import ComponentExample from '../ComponentExample.vue'

const combinations = [
  { label: 'Top / start', side: 'top', align: 'start' },
  { label: 'Top / end', side: 'top', align: 'end' },
  { label: 'Bottom / start', side: 'bottom', align: 'start' },
  { label: 'Bottom / end', side: 'bottom', align: 'end' },
] as const

const code = `<script setup lang="ts">
import { Bubble } from '@nono-cn/nono-ui/components/ui/Bubble'
<\/script>

<template>
  <div class="grid w-full gap-8 sm:grid-cols-2">
    <Bubble side-reaction="top" align-reaction="start">
      Top / start
      <template #reactions><span aria-label="Me gusta">👍</span></template>
    </Bubble>
    <Bubble side-reaction="top" align-reaction="end">
      Top / end
      <template #reactions><span aria-label="Me gusta">👍</span></template>
    </Bubble>
    <Bubble side-reaction="bottom" align-reaction="start">
      Bottom / start
      <template #reactions><span aria-label="Me gusta">👍</span></template>
    </Bubble>
    <Bubble side-reaction="bottom" align-reaction="end">
      Bottom / end
      <template #reactions><span aria-label="Me gusta">👍</span></template>
    </Bubble>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Reacciones"
    description="Comprueba todas las combinaciones de posición y alineación."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-8 sm:grid-cols-2">
      <Bubble
        v-for="combination in combinations"
        :key="combination.label"
        :side-reaction="combination.side"
        :align-reaction="combination.align"
      >
        {{ combination.label }}
        <template #reactions>
          <span aria-label="Me gusta">👍</span>
          <span aria-label="Celebrar">🎉</span>
        </template>
      </Bubble>
    </div>
  </ComponentExample>
</template>
