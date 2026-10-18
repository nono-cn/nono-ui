<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/Tooltip'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const delay = ref('500')
const code = computed(
  () => `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Tooltip } from '__DOCS_PACKAGE__/components/ui/Tooltip'
${scriptEnd}

<template>
  <Tooltip :delay-duration="${delay.value}" text="Opened after ${delay.value}ms">
    <Button label="Hover me" variant="outline" />
  </Tooltip>
</template>`,
)

function reset() {
  delay.value = '500'
}
</script>

<template>
  <ComponentExample
    title="Delay"
    description="Wait before opening the tooltip on hover."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="delay"
        label="Delay (ms)"
        :options="['0', '300', '500', '1000']"
      />
    </template>
    <Tooltip :delay-duration="Number(delay)" :text="`Opened after ${delay}ms`">
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </ComponentExample>
</template>
