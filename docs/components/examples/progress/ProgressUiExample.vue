<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress, type ProgressUI } from '@/components/ui/Progress'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const decorated = ref(true)
const ui = computed<ProgressUI>(() => ({
  indicator: ({ percentage }) => ({
    'data-percentage': Math.round(percentage),
    class: decorated.value ? 'ring-2 ring-inset ring-white/50' : '',
  }),
  label: () => ({ class: decorated.value ? 'uppercase tracking-wider' : '' }),
}))
const code = computed(
  () => `<script setup lang="ts">
import { Progress, type ProgressUI } from '__DOCS_PACKAGE__/components/ui/Progress'

const ui: ProgressUI = {
  indicator: ({ percentage }) => ({ 'data-percentage': Math.round(percentage), class: '${decorated.value ? 'ring-2 ring-inset ring-white/50' : ''}' }),
  label: () => ({ class: '${decorated.value ? 'uppercase tracking-wider' : ''}' }),
}
${scriptEnd}

<template>
  <Progress :model-value="65" size="2xl" label="Uploading" :ui="ui" aria-label="Upload progress" />
</template>`,
)

function reset() {
  decorated.value = true
}
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize indicator and label attributes using their context."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="decorated" label="Decorate indicator and label" />
    </template>
    <div class="w-full max-w-md">
      <Progress
        :model-value="65"
        size="2xl"
        label="Uploading"
        :ui="ui"
        aria-label="Upload progress"
      />
    </div>
  </ComponentExample>
</template>
