<script setup lang="ts">
import { computed, ref } from 'vue'
import { ProgressCircular, type ProgressCircularUI } from '@/components/ui/ProgressCircular'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const decorated = ref(true)
const ui = computed<ProgressCircularUI>(() => ({
  indicator: ({ percentage }) => ({
    'data-percentage': Math.round(percentage),
    'stroke-linecap': decorated.value ? 'butt' : 'round',
  }),
  label: () => ({ class: decorated.value ? 'uppercase tracking-wider' : '' }),
}))
const code = computed(
  () => `<script setup lang="ts">
import { ProgressCircular, type ProgressCircularUI } from '__DOCS_PACKAGE__/components/ui/ProgressCircular'

const ui: ProgressCircularUI = {
  indicator: ({ percentage }) => ({ 'data-percentage': Math.round(percentage), 'stroke-linecap': '${decorated.value ? 'butt' : 'round'}' }),
  label: () => ({ class: '${decorated.value ? 'uppercase tracking-wider' : ''}' }),
}
${scriptEnd}

<template>
  <ProgressCircular :model-value="65" size="xl" label="Sync" :ui="ui" aria-label="Sync progress" />
</template>`,
)

function reset() {
  decorated.value = true
}
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize svg, track, indicator, and label attributes using their context."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="decorated" label="Decorate indicator and label" />
    </template>
    <ProgressCircular
      :model-value="65"
      size="xl"
      label="Sync"
      :ui="ui"
      aria-label="Sync progress"
    />
  </ComponentExample>
</template>
