<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import { Chip, chipDefaults, chipPositions, type ChipPosition } from '@/components/ui/Chip'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const position = ref<ChipPosition>(chipDefaults.position)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
import { Chip, type ChipPosition } from '__DOCS_PACKAGE__/components/ui/Chip'

const position = ref<ChipPosition>('${position.value}')
${scriptEnd}

<template>
  <Chip :position="position">
    <Avatar label="NC" size="lg" />
  </Chip>
</template>`,
)

function reset() {
  position.value = chipDefaults.position
}
</script>

<template>
  <ComponentExample
    title="Position"
    description="Choose the corner where the chip appears."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="position" label="Position" :options="chipPositions" />
      </div>
    </template>
    <Chip :position="position">
      <Avatar label="NC" size="lg" />
    </Chip>
  </ComponentExample>
</template>
