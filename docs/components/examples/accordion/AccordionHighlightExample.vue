<script setup lang="ts">
import { computed, ref } from 'vue'
import { Accordion, type AccordionValue } from '@/components/ui/Accordion'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const highlight = ref(true)
const value = ref<AccordionValue>('security')
const items = [
  {
    value: 'profile',
    label: 'Profile',
    description: 'Review your profile details and update your preferences.',
  },
  {
    value: 'security',
    label: 'Security',
    description: 'Manage your password and account security settings.',
  },
  {
    value: 'notifications',
    label: 'Notifications',
    description: 'Choose how and when you receive account updates.',
  },
]

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Accordion, type AccordionValue } from '__DOCS_PACKAGE__/components/ui/Accordion'

const highlight = ref(${highlight.value})
const value = ref<AccordionValue>('security')
const items = [
  {
    value: 'profile',
    label: 'Profile',
    description: 'Review your profile details and update your preferences.',
  },
  {
    value: 'security',
    label: 'Security',
    description: 'Manage your password and account security settings.',
  },
  {
    value: 'notifications',
    label: 'Notifications',
    description: 'Choose how and when you receive account updates.',
  },
]
${scriptEnd}

<template>
  <label class="flex items-center gap-2 text-sm">
    <input v-model="highlight" type="checkbox" />
    Highlight open item
  </label>
  <Accordion v-model="value" :highlight="highlight" :items="items" />
</template>`,
)

function reset() {
  highlight.value = true
  value.value = 'security'
}
</script>

<template>
  <ComponentExample
    title="Highlight"
    description="Highlight the open item with a neutral background."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="highlight" label="Highlight open item" />
    </template>
    <div class="w-full max-w-3xl">
      <Accordion v-model="value" :highlight="highlight" :items="items" />
    </div>
  </ComponentExample>
</template>
