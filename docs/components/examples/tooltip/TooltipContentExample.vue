<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Tooltip, type TooltipContentConfig } from '@/components/ui/Tooltip'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const side = ref<NonNullable<TooltipContentConfig['side']>>('right')
const align = ref<NonNullable<TooltipContentConfig['align']>>('center')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Tooltip, type TooltipContentConfig } from '__DOCS_PACKAGE__/components/ui/Tooltip'

const side = ref<NonNullable<TooltipContentConfig['side']>>(${JSON.stringify(side.value)})
const align = ref<NonNullable<TooltipContentConfig['align']>>(${JSON.stringify(align.value)})
${scriptEnd}

<template>
  <Tooltip :content="{ side, align, sideOffset: 8 }" text="Positioned on the ${side.value}">
    <Button label="Hover me" variant="outline" />
  </Tooltip>
</template>`,
)

function reset() {
  side.value = 'right'
  align.value = 'center'
}
</script>

<template>
  <ComponentExample
    title="Content position"
    description="Choose the side and alignment of the content."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="side"
          label="Side"
          :options="['top', 'right', 'bottom', 'left']"
        />
        <ExampleSelectControl v-model="align" label="Align" :options="['start', 'center', 'end']" />
      </div>
    </template>
    <Tooltip :content="{ side, align, sideOffset: 8 }" :text="`Positioned on the ${side}`">
      <Button label="Hover me" variant="outline" />
    </Tooltip>
  </ComponentExample>
</template>
