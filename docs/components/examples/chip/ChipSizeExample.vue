<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import { Chip, chipDefaults, chipSizes, type ChipSize } from '@/components/ui/Chip'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<ChipSize>(chipDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
import { Chip, type ChipSize } from '__DOCS_PACKAGE__/components/ui/Chip'

const size = ref<ChipSize>('${size.value}')
${scriptEnd}

<template>
  <Chip :size="size">
    <Avatar label="NC" size="lg" />
  </Chip>
</template>`,
)

function reset() {
  size.value = chipDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Choose the chip’s visual size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="chipSizes" />
      </div>
    </template>
    <Chip :size="size">
      <Avatar label="NC" size="lg" />
    </Chip>
  </ComponentExample>
</template>
