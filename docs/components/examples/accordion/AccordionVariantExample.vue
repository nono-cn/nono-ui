<script setup lang="ts">
import { computed, ref } from 'vue'
import { Accordion, accordionVariantNames, type AccordionVariant } from '@/components/ui/Accordion'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const types = ['single', 'multiple'] as const
const variant = ref<AccordionVariant>('frame')
const type = ref<(typeof types)[number]>('single')
const highlight = ref(false)

const items = [
  {
    value: 'account',
    label: 'Account',
    description: 'Manage your personal details and preferences.',
    icon: 'user',
  },
  {
    value: 'security',
    label: 'Security',
    description: 'Update your password and authentication settings.',
    icon: 'warning',
  },
  {
    value: 'notifications',
    label: 'Notifications',
    description: 'Choose which notifications you want to receive.',
    icon: 'info',
  },
]

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '__DOCS_PACKAGE__/components/ui/Accordion'

const highlight = ref(${highlight.value})
const items = [
  {
    value: 'account',
    label: 'Account',
    description: 'Manage your personal details and preferences.',
    icon: 'user',
  },
  {
    value: 'security',
    label: 'Security',
    description: 'Update your password and authentication settings.',
    icon: 'warning',
  },
  {
    value: 'notifications',
    label: 'Notifications',
    description: 'Choose which notifications you want to receive.',
    icon: 'info',
  },
]
${scriptEnd}

<template>
  <label class="flex items-center gap-2 text-sm">
    <input v-model="highlight" type="checkbox" />
    Highlight open item
  </label>
  <Accordion
    variant="${variant.value}"
    type="${type.value}"
    :highlight="highlight"
    :items="items"
  />
</template>`,
)

function reset() {
  variant.value = 'frame'
  type.value = 'single'
  highlight.value = false
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Choose a visual style, expansion behavior, and whether to highlight the open item."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="accordionVariantNames" />
        <ExampleSelectControl v-model="type" label="Type" :options="types" />
        <ExampleCheckboxControl v-model="highlight" label="Highlight open item" />
      </div>
    </template>
    <div class="w-full max-w-3xl">
      <Accordion :variant="variant" :type="type" :highlight="highlight" :items="items" />
    </div>
  </ComponentExample>
</template>
