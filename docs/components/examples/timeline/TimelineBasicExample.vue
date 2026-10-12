<script setup lang="ts">
import { computed, ref } from 'vue'
import { Timeline } from '@/components/ui/Timeline'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  {
    value: 'ordered',
    label: 'Ordered',
    description: 'Your order was placed.',
    icon: 'fileText' as const,
  },
  {
    value: 'shipped',
    label: 'Shipped',
    description: 'Your package is on its way.',
    icon: 'upload' as const,
  },
  {
    value: 'delivered',
    label: 'Delivered',
    description: 'Your package arrived.',
    icon: 'check' as const,
  },
]
const value = ref('shipped')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Timeline } from '__DOCS_PACKAGE__/components/ui/Timeline'

const items = ${JSON.stringify(items, null, 2)}
const value = ref('${value.value}')
${scriptEnd}

<template>
  <Timeline v-model="value" :items="items" />
</template>`,
)

function reset() {
  value.value = 'shipped'
}
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Show a sequence with a current item."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="value"
        label="Current item"
        :options="items.map((item) => item.value)"
      />
    </template>
    <div class="w-full max-w-xl">
      <Timeline v-model="value" :items="items" />
    </div>
  </ComponentExample>
</template>
