<script setup lang="ts">
import { computed, ref } from 'vue'
import { RadioGroup, type RadioGroupItem, type RadioGroupUI } from '@/components/ui/RadioGroup'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: RadioGroupItem[] = [
  { label: 'Draft', description: 'Only you can see it.', value: 'draft' },
  { label: 'Review', description: 'Reviewers can comment.', value: 'review' },
  { label: 'Published', description: 'Visible to everyone.', value: 'published' },
]
const value = ref('review')
const boldChecked = ref(true)
const squareRadio = ref(false)
const ui = computed<RadioGroupUI>(() => ({
  legend: ({ value }) => ({ class: value ? '' : 'text-muted-foreground' }),
  base: () => ({ class: squareRadio.value ? 'rounded-sm' : '' }),
  indicator: () => ({ class: squareRadio.value ? 'after:rounded-[2px]' : '' }),
  label: ({ checked }) => ({
    class: boldChecked.value && checked ? 'font-semibold text-foreground' : '',
  }),
}))
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, type RadioGroupItem, type RadioGroupUI } from '__DOCS_PACKAGE__/components/ui/RadioGroup'

const items: RadioGroupItem[] = [
  { label: 'Draft', description: 'Only you can see it.', value: 'draft' },
  { label: 'Review', description: 'Reviewers can comment.', value: 'review' },
  { label: 'Published', description: 'Visible to everyone.', value: 'published' },
]
const value = ref('${value.value}')
const ui: RadioGroupUI = {
  legend: ({ value }) => ({ class: value ? '' : 'text-muted-foreground' }),
  base: () => ({ class: '${squareRadio.value ? 'rounded-sm' : ''}' }),
  indicator: () => ({ class: '${squareRadio.value ? 'after:rounded-[2px]' : ''}' }),
  label: ({ checked }) => ({
    class: ${boldChecked.value ? `checked ? 'font-semibold text-foreground' : ''` : `''`},
  }),
}
${scriptEnd}

<template>
  <RadioGroup v-model="value" :items="items" :ui="ui" legend="Status" />
</template>`,
)

function reset() {
  value.value = 'review'
  boldChecked.value = true
  squareRadio.value = false
}
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize each part using the group context or the context of each item."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleCheckboxControl v-model="boldChecked" label="Bold checked label" />
        <ExampleCheckboxControl v-model="squareRadio" label="Square radio" />
      </div>
    </template>
    <RadioGroup v-model="value" :items="items" :ui="ui" legend="Status" />
  </ComponentExample>
</template>
