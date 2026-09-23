<script setup lang="ts">
import { Bubble } from '@/components/ui/Bubble'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const combinations = [
  { label: 'Top / start', side: 'top', align: 'start' },
  { label: 'Top / end', side: 'top', align: 'end' },
  { label: 'Bottom / start', side: 'bottom', align: 'start' },
  { label: 'Bottom / end', side: 'bottom', align: 'end' },
] as const

const code = `<script setup lang="ts">
import { Bubble } from '__DOCS_PACKAGE__/components/ui/Bubble'
${scriptEnd}

<template>
  <div class="grid w-full gap-8 sm:grid-cols-2">
    <Bubble side-reaction="top" align-reaction="start">
      Top / start
      <template #reactions><span aria-label="Like">👍</span><span aria-label="Celebrate">🎉</span></template>
    </Bubble>
    <Bubble side-reaction="top" align-reaction="end">
      Top / end
      <template #reactions><span aria-label="Like">👍</span><span aria-label="Celebrate">🎉</span></template>
    </Bubble>
    <Bubble side-reaction="bottom" align-reaction="start">
      Bottom / start
      <template #reactions><span aria-label="Like">👍</span><span aria-label="Celebrate">🎉</span></template>
    </Bubble>
    <Bubble side-reaction="bottom" align-reaction="end">
      Bottom / end
      <template #reactions><span aria-label="Like">👍</span><span aria-label="Celebrate">🎉</span></template>
    </Bubble>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Reactions"
    description="Compare all side and alignment combinations."
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
          <span aria-label="Like">👍</span>
          <span aria-label="Celebrate">🎉</span>
        </template>
      </Bubble>
    </div>
  </ComponentExample>
</template>
