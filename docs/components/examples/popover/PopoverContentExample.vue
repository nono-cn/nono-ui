<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Popover, type PopoverContentConfig } from '@/components/ui/Popover'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const side = ref<NonNullable<PopoverContentConfig['side']>>('right')
const align = ref<NonNullable<PopoverContentConfig['align']>>('start')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Popover, type PopoverContentConfig } from '__DOCS_PACKAGE__/components/ui/Popover'

const side = ref<NonNullable<PopoverContentConfig['side']>>(${JSON.stringify(side.value)})
const align = ref<NonNullable<PopoverContentConfig['align']>>(${JSON.stringify(align.value)})
${scriptEnd}

<template>
  <Popover :content="{ side, align, sideOffset: 12 }" :ui="{ content: () => ({ class: 'w-56' }) }">
    <Button label="Open popover" variant="outline" />
    <template #content><p class="text-sm">Positioned on the {{ side }}.</p></template>
  </Popover>
</template>`,
)

function reset() {
  side.value = 'right'
  align.value = 'start'
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
    <Popover
      :content="{ side, align, sideOffset: 12 }"
      :ui="{ content: () => ({ class: 'w-56' }) }"
    >
      <Button label="Open popover" variant="outline" />
      <template #content
        ><p class="text-sm">Positioned on the {{ side }}.</p></template
      >
    </Popover>
  </ComponentExample>
</template>
