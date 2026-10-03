<script setup lang="ts">
import { computed, ref } from 'vue'
import { HoverCard, type HoverCardContentConfig } from '@/components/ui/HoverCard'
import { Link } from '@/components/ui/Link'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const side = ref<NonNullable<HoverCardContentConfig['side']>>('right')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { HoverCard, type HoverCardContentConfig } from '__DOCS_PACKAGE__/components/ui/HoverCard'
import { Link } from '__DOCS_PACKAGE__/components/ui/Link'

const side = ref<NonNullable<HoverCardContentConfig['side']>>(${JSON.stringify(side.value)})
${scriptEnd}

<template>
  <HoverCard :content="{ side, align: 'start', sideOffset: 12 }">
    <Link to="#profile" label="@nonito" />
    <template #content><p>Positioned on the {{ side }}.</p></template>
  </HoverCard>
</template>`,
)

function reset() {
  side.value = 'right'
}
</script>

<template>
  <ComponentExample
    title="Content position"
    description="Choose the side of the trigger."
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
      </div>
    </template>
    <HoverCard :content="{ side, align: 'start', sideOffset: 12 }">
      <Link to="#profile" label="@nonito" />
      <template #content
        ><p>Positioned on the {{ side }}.</p></template
      >
    </HoverCard>
  </ComponentExample>
</template>
