<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/Tooltip'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const showArrow = ref('yes')
const code = computed(
  () => `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Tooltip } from '__DOCS_PACKAGE__/components/ui/Tooltip'
${scriptEnd}

<template>
  <Tooltip text="Tooltip arrow" :show-arrow="${showArrow.value === 'yes'}" :arrow="{ width: 16, height: 8 }">
    <Button label="Hover me" variant="outline" />
  </Tooltip>
</template>`,
)

function reset() {
  showArrow.value = 'yes'
}
</script>

<template>
  <ComponentExample
    title="Arrow"
    description="Show or hide the arrow and customize its size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="showArrow" label="Show arrow" :options="['yes', 'no']" />
    </template>
    <Tooltip
      text="Tooltip arrow"
      :show-arrow="showArrow === 'yes'"
      :arrow="{ width: 16, height: 8 }"
    >
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </ComponentExample>
</template>
