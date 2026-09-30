<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge, badgeSizes, type BadgeSize } from '@/components/ui/Badge'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<BadgeSize>('md')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Badge, type BadgeSize } from '__DOCS_PACKAGE__/components/ui/Badge'

const size = ref<BadgeSize>('${size.value}')
${scriptEnd}

<template>
  <Badge label="Active" :size="size" icon="check" trailing-icon="chevronRight" />
</template>`,
)

function reset() {
  size.value = 'md'
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Choose the badge size, internal spacing, and icon size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="badgeSizes" />
      </div>
    </template>
    <Badge label="Active" :size="size" icon="check" trailing-icon="chevronRight" />
  </ComponentExample>
</template>
