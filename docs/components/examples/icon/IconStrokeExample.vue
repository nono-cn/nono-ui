<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const strokeValues = ['1', '1.5', '2', '2.5', '3']
const stroke = ref('2')
const code = computed(
  () => `<script setup lang="ts">
import { Icon } from '__DOCS_PACKAGE__/components/ui/Icon'
${scriptEnd}

<template>
  <Icon name="check" :stroke="${stroke.value}" />
</template>`,
)

function reset() {
  stroke.value = '2'
}
</script>

<template>
  <ComponentExample
    title="Stroke"
    description="Set the icon’s stroke width. The default is 2."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="stroke" label="Stroke" :options="strokeValues" />
      </div>
    </template>
    <Icon name="check" :stroke="Number(stroke)" />
  </ComponentExample>
</template>
